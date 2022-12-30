import { Injectable, NotFoundException } from '@nestjs/common'
import { AddClickDTO } from './dto'
import { EntityManager } from 'typeorm'
import { Click } from './entities'
import { ForeignService } from './foreign.service'
import { grpc } from '@tds/contracts'
import { ActionTypeFactory } from './action-type'
import { RedirectTypeFactory } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import weighted from 'weighted'
import Type = grpc.click.AddClickResponse.Type

type HandleLandingsOffersResponse = {
  offer: grpc.offer.Offer
  response: click.AddClickResponse
}

type HandleStreamSchemaResponse = {
  offer: grpc.offer.Offer | null
  response: click.AddClickResponse
}

@Injectable()
export class ClickService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
    private readonly actionTypeFactory: ActionTypeFactory,
    private readonly redirectTypeFactory: RedirectTypeFactory,
  ) {}

  async add(clickData: AddClickDTO): Promise<grpc.click.AddClickResponse> {
    try {
      return await this.#add(clickData)
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          type: grpc.click.AddClickResponse.Type.NOT_FOUND,
        }
      }

      throw e
    }
  }

  async #add(clickData: AddClickDTO): Promise<grpc.click.AddClickResponse> {
    const campaign = await this.#getCampaignByCode(clickData.campaignCode)

    return this.addByCampaign(campaign, clickData)
  }

  async addByCampaign(
    campaign: grpc.campaign.Campaign,
    clickData: AddClickDTO,
  ): Promise<grpc.click.AddClickResponse> {
    if (!campaign.streams || !campaign.streams.length) {
      throw new Error('No streams')
    }

    const stream = this.#getSelectedStream(campaign.streams)

    const { response, offer } = await this.#handleStreamSchema(
      stream,
      clickData,
    )

    await this.entityManager.save(Click, {
      campaignId: campaign.id!,
      campaignGroupId: campaign.groupId,
      dateTime: new Date(),
      ip: clickData.ip,
      streamId: stream.id,
      offerId: offer?.id,
      affiliateNetworkId: offer?.affiliateNetworkId,
      trafficSourceId: campaign.trafficSourceId,
    })

    return response
  }

  async #handleStreamSchema(
    stream: grpc.campaign.CampaignStream,
    clickData: AddClickDTO,
  ): Promise<HandleStreamSchemaResponse> {
    if (stream.schema === undefined || stream.schema === null) {
      throw new Error('Stream not found')
    }

    let response: grpc.click.AddClickResponse
    let offer: grpc.offer.Offer | null = null

    switch (stream.schema) {
      case grpc.campaign.StreamSchema.ACTION:
        response = await (
          await this.actionTypeFactory.create(stream.actionType!)
        ).handle(stream, clickData)
        break
      case grpc.campaign.StreamSchema.DIRECT_URL:
        response = await this.redirectTypeFactory
          .create(stream.redirectType!)
          .handle(stream.redirectUrl!)
        break
      case grpc.campaign.StreamSchema.LANDINGS_OFFERS:
        const data = await this.#handleLandingsOffers(stream, clickData)
        response = data.response
        offer = data.offer
        break
      default:
        const s: never = stream.schema
        throw new Error('Unknown stream schema ' + s)
    }

    return {
      response,
      offer,
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
    args: AddClickDTO,
  ): Promise<HandleLandingsOffersResponse> {
    if (!stream.streamOffers || !stream.streamOffers.length) {
      throw new Error('No streamOffers')
    }

    console.log('Total streamOffers', stream.streamOffers.length)

    const streamOffer = this.#selectStreamOffer(stream.streamOffers)

    console.log('Selected offer', streamOffer.id, streamOffer.percent)

    const offer = await this.#getOfferById(streamOffer.offerId!)

    if (offer.type === undefined || offer.type === null) {
      throw new Error('offer.type not set')
    }

    let response: click.AddClickResponse

    switch (offer.type) {
      case grpc.offer.OfferType.ACTION:
        const action = await this.actionTypeFactory.create(offer.actionType!)
        response = await action.handle(offer, args)
        break
      case grpc.offer.OfferType.REDIRECT:
        response = await this.redirectTypeFactory
          .create(offer.redirectType!)
          .handle(offer.redirectUrl!)
        break
      case grpc.offer.OfferType.PRELOAD:
        // Может отличается от redirect curl?
        response = await this.redirectTypeFactory
          .create(grpc.global.RedirectType.CURL)
          .handle(offer.preloadUrl!)
        break
      case grpc.offer.OfferType.LOCAL:
        response = { type: Type.CONTENT, content: 'LOCAL not realized' }
        break
      default:
        const type: never = offer.type
        throw new Error('Unknown offer.type' + type)
    }

    return {
      response,
      offer,
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
}
