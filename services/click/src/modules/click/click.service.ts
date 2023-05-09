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
    private readonly templateService: TemplateService,
  ) {}

  async add(input: ClickInputDTO): Promise<grpc.click.IAddClickResponse> {
    try {
      return await this.#add(input)
    } catch (e: unknown) {
      if (e instanceof NotFoundException) {
        return {
          type: grpc.click.AddClickResponse.Type.NOT_FOUND,
        }
      }

      throw e
    }
  }

  async #add(input: ClickInputDTO): Promise<grpc.click.IAddClickResponse> {
    const campaign = await this.#getCampaignByCode(input.campaignCode)

    const clickData = new ClickData(input)
    clickData.setFromCampaign(campaign)

    return this.addByCampaign(campaign, clickData)
  }

  async addByCampaign(
    campaign: grpc.campaign.ICampaign,
    clickData: ClickData,
  ): Promise<grpc.click.IAddClickResponse> {
    if (!campaign.streams || !campaign.streams.length) {
      throw new Error('No streams')
    }

    const stream = this.#getSelectedStream(campaign.streams)

    clickData.setFromStream(stream)

    const response = await this.#handleStreamSchema(stream, clickData)

    await this.entityManager.save(Click, clickData)

    return response
  }

  async #handleStreamSchema(
    stream: grpc.campaign.ICampaignStream,
    clickData: ClickData,
  ): Promise<grpc.click.IAddClickResponse> {
    if (stream.schema === undefined || stream.schema === null) {
      throw new Error('Stream schema not found')
    }

    switch (stream.schema) {
      case grpc.campaign.StreamSchema.ACTION:
        const at = await this.actionTypeFactory.create(stream.actionType!)

        return at.handle(stream, clickData)
      case grpc.campaign.StreamSchema.DIRECT_URL:
        return this.redirectTypeFactory
          .create(stream.redirectType!)
          .handle(stream.redirectUrl!)
      case grpc.campaign.StreamSchema.LANDINGS_OFFERS:
        return this.#handleLandingsOffers(stream, clickData)
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

  #getSelectedStream<T extends grpc.campaign.ICampaignStream>(streams: T[]): T {
    if (streams.length === 0) {
      throw new Error('No streams')
    }

    return streams[0]
  }

  async #handleLandingsOffers(
    stream: campaign.ICampaignStream,
    clickData: ClickData,
  ): Promise<click.IAddClickResponse> {
    if (!stream.streamOffers || !stream.streamOffers.length) {
      throw new Error('No streamOffers')
    }

    console.log('Total streamOffers', stream.streamOffers.length)

    const streamOffer = this.#selectStreamOffer(stream.streamOffers)

    console.log('Selected offer', streamOffer.id, streamOffer.percent)

    const offer = await this.#getOfferById(streamOffer.offerId!)
    clickData.setFromOffer(offer)

    if (offer.type === undefined || offer.type === null) {
      throw new Error('offer.type not set')
    }

    switch (offer.type) {
      case grpc.offer.OfferType.ACTION:
        const action = await this.actionTypeFactory.create(offer.actionType!)

        return action.handle(offer, clickData)
      case grpc.offer.OfferType.REDIRECT:
        const redirectUrl = await this.#setOfferUrlParams(
          offer,
          offer.redirectUrl!,
          clickData,
        )

        return this.redirectTypeFactory
          .create(offer.redirectType!)
          .handle(redirectUrl)
      case grpc.offer.OfferType.PRELOAD:
        // Может отличается от redirect curl?
        const preloadUrl = await this.#setOfferUrlParams(
          offer,
          offer.preloadUrl!,
          clickData,
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

  #selectStreamOffer<T extends grpc.campaign.IStreamOffer>(
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
    offer: grpc.offer.IOffer,
    inputUrl: string,
    clickData: ClickData,
  ): Promise<string> {
    if (!offer.affiliateNetworkId) {
      return inputUrl
    }

    const an = await this.#getAffiliateNetworkById(offer.affiliateNetworkId)

    if (!an.offerParam) {
      return inputUrl
    }

    const res = this.templateService.parse(an.offerParam, clickData, {
      encodeUri: true,
    })

    if (inputUrl.includes('?')) {
      return inputUrl + '&' + res
    } else {
      return inputUrl + '?' + res
    }
  }
}
