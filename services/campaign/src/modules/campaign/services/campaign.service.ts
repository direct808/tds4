import { CampaignSaveDTO } from '../../../dto'
import { Campaign } from '../../../entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { CampaignGroupService } from './campaign-group.service'
import { ForeignService } from './foreign.service'
import { CampaignStreamService } from './campaign-stream.service'
import { customAlphabet } from 'nanoid/async'
import { alphanumeric } from 'nanoid-dictionary'

type FindArgs = {
  ids?: string[]
  codes?: string[]
}

type FullArgs = {
  id?: string
  code?: string
}

@Injectable()
export class CampaignService {
  private readonly nanoId = customAlphabet(alphanumeric)
  constructor(
    private readonly entityManager: EntityManager,
    private readonly campaignGroupService: CampaignGroupService,
    private readonly foreignService: ForeignService,
    private readonly campaignStreamService: CampaignStreamService,
  ) {}

  async full(args: Readonly<FullArgs>) {
    const { id, code } = args

    return this.entityManager.findOne(Campaign, {
      where: { id, code },
      relations: ['streams', 'streams.streamOffers'],
    })
  }

  async find(args: Readonly<FindArgs>) {
    const { ids, codes } = args

    return this.entityManager.find(Campaign, {
      where: {
        ...(ids ? { id: Any(ids) } : {}),
        ...(codes ? { code: Any(codes) } : {}),
      },
    })
  }

  async save(
    input: CampaignSaveDTO,
    manager?: EntityManager,
  ): Promise<Campaign> {
    if (!manager) {
      return this.entityManager.connection.transaction((manager) => {
        return this.save(input, manager)
      })
    }

    if (input.id) {
      await manager.findOneByOrFail(Campaign, {
        id: input.id,
      })
    }

    if (input.groupId) {
      const groups = await this.campaignGroupService.find({
        ids: [input.groupId],
      })
      if (groups.length === 0) {
        throw new Error('Campaign group not found')
      }
    }

    if (input.trafficSourceId) {
      const trafficSources = await this.foreignService.getTrafficSourceList({
        ids: [input.trafficSourceId],
      })
      if (trafficSources.length === 0) {
        throw new Error('trafficSource not found')
      }

      console.log('trafficSources.length', trafficSources.length)
    }

    const { streams, ...campaignData } = input

    const entity = this.entityManager.create(Campaign, campaignData) as Campaign

    if (!input.id) {
      entity.code = await this.#makeCode()
    }

    const campaign = await manager.save(Campaign, entity)

    await this.campaignStreamService.saveMany(
      {
        campaignId: campaign.id,
        streams,
      },
      manager,
    )

    return manager.findOneOrFail(Campaign, { where: { id: campaign.id } })
  }

  #makeCode() {
    return this.nanoId(6)
  }
}
