import { Injectable, NotFoundException } from '@nestjs/common'
import { AddClickDTO } from './dto'
import { EntityManager } from 'typeorm'
import { Click } from './entities'
import { ForeignService } from './foreign.service'
import { grpc } from '@tds/contracts'
import { ActionTypeFactory } from './action-type'
import { RedirectTypeFactory } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import Type = grpc.click.AddClickResponse.Type

@Injectable()
export class ClickService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
    private readonly actionTypeFactory: ActionTypeFactory,
    private readonly redirectTypeFactory: RedirectTypeFactory,
  ) {}

  async add(args: AddClickDTO): Promise<grpc.click.AddClickResponse> {
    try {
      return await this.addByCode(args.campaignCode)
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          type: grpc.click.AddClickResponse.Type.NOT_FOUND,
        }
      }
      throw e
    }
  }

  async addByCode(code: string): Promise<grpc.click.AddClickResponse> {
    const campaign = await this.#getCampaignByCode(code)
    return this.addByCampaign(campaign)
  }

  async addByCampaign(
    campaign: grpc.campaign.Campaign,
  ): Promise<grpc.click.AddClickResponse> {
    if (!campaign.streams || !campaign.streams.length) {
      throw new Error('No streams')
    }
    const stream = this.#getSelectedStream(campaign.streams)

    if (stream.schema === undefined || stream.schema === null) {
      throw new Error('Stream not found')
    }

    await this.entityManager.save(Click, {})

    switch (stream.schema) {
      case grpc.campaign.StreamSchema.ACTION:
        return (await this.actionTypeFactory.create(stream.actionType!)).handle(
          stream,
        )
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

    // console.log('select stream', stream)
    // return {
    //   type: grpc.click.AddClickResponse.Type.CONTENT,
    //   content: 'form click service',
    // }
  }

  async #getCampaignByCode(code: string) {
    const { campaign } = await this.foreignService.getCampaignFull({ code })

    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }
    return campaign
  }

  #getSelectedStream(
    streams: grpc.campaign.CampaignStream[],
  ): grpc.campaign.CampaignStream {
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
    const [streamOffer] = stream.streamOffers
    console.log(streamOffer)

    const { offers } = await this.foreignService.getOfferList({
      ids: [streamOffer.offerId!],
    })
    const [offer] = offers!

    if (offer.type === undefined || offer.type === null) {
      throw new Error('offer.type not set')
    }

    switch (offer.type) {
      case grpc.offer.OfferType.ACTION:
        const action = await this.actionTypeFactory.create(offer.actionType!)
        return action.handle(offer)
      case grpc.offer.OfferType.REDIRECT:
        return this.redirectTypeFactory
          .create(offer.redirectType!)
          .handle(offer.redirectUrl!)
      case grpc.offer.OfferType.PRELOAD:
        return { type: Type.CONTENT, content: 'PRELOAD not realized' }
      case grpc.offer.OfferType.LOCAL:
        return { type: Type.CONTENT, content: 'LOCAL not realized' }

      default:
        const type: never = offer.type
        throw new Error('Unknown offer.type' + type)
    }

    return {
      type: Type.CONTENT,
      content: 'handleLandingsOffers',
    }
  }
}
