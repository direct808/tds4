import { Injectable, NotFoundException } from '@nestjs/common'
import { AddClickDTO } from './dto'
import { EntityManager } from 'typeorm'
import { Click } from './entities'
import { ForeignService } from './foreign.service'
import { grpc } from '@tds/contracts'
import { ActionTypeFactory } from './action-type'
import { RedirectTypeFactory } from './redirect-type'

@Injectable()
export class ClickService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
    private readonly actionTypeFactory: ActionTypeFactory,
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
    const streams = await this.foreignService.getCampaignStreamList({
      campaignId: campaign.id,
    })
    const stream = this.#getSelectedStream(streams)

    if (stream.schema === undefined) {
      throw new Error('Stream not found')
    }

    await this.entityManager.save(Click, {})

    switch (stream.schema) {
      case grpc.campaign.StreamSchema.ACTION:
        return (await this.actionTypeFactory.create(stream)).handle(stream)
      case grpc.campaign.StreamSchema.DIRECT_URL:
        return RedirectTypeFactory.create(stream).handle(stream)
      case grpc.campaign.StreamSchema.LANDINGS_OFFERS:
        throw new Error('Not implemented Schema.LANDINGS_OFFERS')
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
    const { result } = await this.foreignService.getCampaignList({
      codes: [code],
    })
    const [campaign] = result!
    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }
    return campaign
  }

  #getSelectedStream(
    streams: grpc.campaign.CampaignStream[],
  ): grpc.campaign.CampaignStream {
    if (streams.length == 0) {
      throw new Error('No streams')
    }
    return streams[0]
  }
}
