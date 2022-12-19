import { Injectable, NotFoundException } from '@nestjs/common'
import { AddClickDTO } from './dto'
import { EntityManager } from 'typeorm'
import { Click } from './entities'
import { ForeignService } from './foreign.service'
import * as grpc from '@tds/contracts'

@Injectable()
export class ClickService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
  ) {}

  async add(args: AddClickDTO): Promise<grpc.click.AddClickResponse> {
    try {
      return await this.#add(args)
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          type: grpc.click.ResponseType.NOT_FOUND,
        }
      }
      throw e
    }
  }

  async #add(args: AddClickDTO): Promise<grpc.click.AddClickResponse> {
    const campaign = await this.#getCampaignByCode(args.campaignCode)
    const streams = await this.foreignService.getCampaignStreamList({
      campaignId: campaign.id,
    })
    const stream = this.#getSelectedStream(streams)

    if (stream.schema === undefined) {
      throw new Error('Stream not found')
    }

    switch (stream.schema) {
      case grpc.campaign.StreamSchema.ACTION:
        return this.#processActionType(stream)
      case grpc.campaign.StreamSchema.DIRECT_URL:
        console.log('schema direct url')
        break
      case grpc.campaign.StreamSchema.LANDINGS_OFFERS:
        throw new Error('Not implemented Schema.LANDINGS_OFFERS')
      default:
        const s: never = stream.schema
        throw new Error('Unknown stream schema ' + s)
    }

    console.log('select stream', stream)
    await this.entityManager.save(Click, {})
    return {
      type: grpc.click.ResponseType.CONTENT,
      content: 'form click service',
    }
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

  async #processActionType(
    stream: grpc.campaign.CampaignStream,
  ): Promise<grpc.click.AddClickResponse> {
    if (typeof stream.actionType === 'undefined') {
      throw new Error('actionType not set')
    }
    switch (stream.actionType) {
      case grpc.campaign.StreamActionType.SHOW404:
        return { type: grpc.click.ResponseType.NOT_FOUND }
      case grpc.campaign.StreamActionType.SHOW_HTML:
        return {
          type: grpc.click.ResponseType.CONTENT,
          content: stream.actionContent,
        }
      case grpc.campaign.StreamActionType.SHOW_TEXT:
        // todo need escape string
        throw new Error('Not realize')
      case grpc.campaign.StreamActionType.NOTHING:
        return { type: grpc.click.ResponseType.NOTHING }
      case grpc.campaign.StreamActionType.TO_CAMPAIGN:
        throw new Error('Not realize')
    }
    const at: never = stream.actionType
    throw new Error('Unknown actionType ' + at)
  }
}
