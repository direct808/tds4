import { Injectable, NotFoundException } from '@nestjs/common'
import { ClickInputDTO } from '../../dto'
import { EntityManager } from 'typeorm'
import { Click } from '../../entities'
import { ForeignService } from './foreign.service'
import { grpc } from '@tds/contracts'
import { ActionTypeFactory } from './action-type'
import { RedirectTypeFactory } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import weighted from 'weighted'
import { ClickData } from './click-data'
import { TemplateService } from './template.service'
import Type = grpc.click.AddClickResponse.Type

@Injectable()
export class ClickService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
    private readonly actionTypeFactory: ActionTypeFactory,
    private readonly redirectTypeFactory: RedirectTypeFactory,
    private readonly clickInput: ClickInputDTO,
    private readonly clickData: ClickData,
    private readonly templateService: TemplateService,
  ) {}

  async add(): Promise<grpc.click.AddClickResponse> {
    try {
      return await this.#add()
    } catch (e: unknown) {
      if (e instanceof NotFoundException) {
        return {
          type: grpc.click.AddClickResponse.Type.NOT_FOUND,
        }
      }

      throw e
    }
  }

  async #add(): Promise<grpc.click.AddClickResponse> {
    const campaign = await this.#getCampaignByCode(this.clickInput.campaignCode)

    this.clickData.setFromCampaign(campaign)

    return this.addByCampaign(campaign)
  }

  async addByCampaign(
    campaign: grpc.campaign.Campaign,
  ): Promise<grpc.click.AddClickResponse> {
    if (!campaign.streams || !campaign.streams.length) {
      throw new Error('No streams')
    }

    const stream = this.#getSelectedStream(campaign.streams)

    this.clickData.setFromStream(stream)

    const response = await this.#handleStreamSchema(stream)

    await this.entityManager.save(Click, this.clickData)

    return response
  }

  async #handleStreamSchema(
    stream: grpc.campaign.CampaignStream,
  ): Promise<grpc.click.AddClickResponse> {
    if (stream.schema === undefined || stream.schema === null) {
      throw new Error('Stream not found')
    }

    switch (stream.schema) {
      case grpc.campaign.StreamSchema.ACTION:
        const at = await this.actionTypeFactory.create(stream.actionType!)

        return at.handle(stream)
      case grpc.campaign.StreamSchema.DIRECT_URL:
        return this.redirectTypeFactory
          .create(stream.redirectType!)
          .handle(stream.redirectUrl!)
      case grpc.campaign.StreamSchema.LANDINGS_OFFERS:
        return this.#handleLandingsOffers(stream)
      default:
        const s: never = stream.schema
        throw new Error('Unknown stream schema ' + s)
    }
  }

  async #getCampaignByCode(code: string) {
    const { campaign } = await this.foreignService.getCampaignFull({ code })

    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }

    return campaign
  }

  #getSelectedStream<T extends grpc.campaign.CampaignStream>(streams: T[]): T {
    if (streams.length === 0) {
      throw new Error('No streams')
    }

    return streams[0]
  }

  async #handleLandingsOffers(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    if (!stream.streamOffers || !stream.streamOffers.length) {
      throw new Error('No streamOffers')
    }

    console.log('Total streamOffers', stream.streamOffers.length)

    const streamOffer = this.#selectStreamOffer(stream.streamOffers)

    console.log('Selected offer', streamOffer.id, streamOffer.percent)

    const offer = await this.#getOfferById(streamOffer.offerId!)
    this.clickData.setFromOffer(offer)

    if (offer.type === undefined || offer.type === null) {
      throw new Error('offer.type not set')
    }

    switch (offer.type) {
      case grpc.offer.OfferType.ACTION:
        const action = await this.actionTypeFactory.create(offer.actionType!)

        return action.handle(offer)
      case grpc.offer.OfferType.REDIRECT:
        const redirectUrl = await this.#setOfferUrlParams(
          offer,
          offer.redirectUrl!,
        )

        return this.redirectTypeFactory
          .create(offer.redirectType!)
          .handle(redirectUrl)
      case grpc.offer.OfferType.PRELOAD:
        // Может отличается от redirect curl?
        const preloadUrl = await this.#setOfferUrlParams(
          offer,
          offer.preloadUrl!,
        )

        return this.redirectTypeFactory
          .create(grpc.global.RedirectType.CURL)
          .handle(preloadUrl)
      case grpc.offer.OfferType.LOCAL:
        return { type: Type.CONTENT, content: 'LOCAL not realized' }
      default:
        const type: never = offer.type
        throw new Error('Unknown offer.type' + type)
    }
  }

  #selectStreamOffer<T extends grpc.campaign.StreamOffer>(
    streamOffers: T[],
  ): T {
    if (streamOffers.length === 0) {
      throw new Error('No streamOffers')
    }

    if (streamOffers.length === 1) {
      return streamOffers[0]
    }

    return weighted.select(
      streamOffers,
      streamOffers.map((o) => o.percent!),
    )
  }

  async #getOfferById(id: string) {
    const { offers } = await this.foreignService.getOfferList({
      ids: [id],
    })

    if (!offers?.length) {
      throw new Error('Offer not found ' + id)
    }

    return offers[0]
  }

  async #getAffiliateNetworkById(id: string) {
    const { result } = await this.foreignService.getAffiliateNetworkList({
      ids: [id],
    })

    if (!result?.length) {
      throw new Error('AffiliateNetwork not found ' + id)
    }

    return result[0]
  }

  async #setOfferUrlParams(
    offer: grpc.offer.Offer,
    inputUrl: string,
  ): Promise<string> {
    if (!offer.affiliateNetworkId) {
      return inputUrl
    }

    const an = await this.#getAffiliateNetworkById(offer.affiliateNetworkId)

    if (!an.offerParam) {
      return inputUrl
    }

    const res = this.templateService.parse(an.offerParam, { encodeUri: true })

    if (inputUrl.includes('?')) {
      return inputUrl + '&' + res
    } else {
      return inputUrl + '?' + res
    }
  }
}
