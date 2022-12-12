import { CampaignSaveDTO } from './dto'
import { Campaign } from './entities'
import { Any, ConnectionManager, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { CampaignGroupService } from './campaign-group.service'
import { ForeignService } from './foreign.service'
import { Transaction } from '@nestjs/microservices/external/kafka.interface'
import { CampaignStreamService } from './campaign-stream.service'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class CampaignService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly campaignGroupService: CampaignGroupService,
    private readonly foreignService: ForeignService,
    private readonly campaignStreamService: CampaignStreamService,
  ) {}

  async find(args: Readonly<FindArgs>) {
    const { ids } = args
    return this.entityManager.find(Campaign, {
      where: {
        ...(ids ? { id: Any(ids) } : {}),
      },
    })
  }

  async count(args: FindArgs) {
    const { ids } = args
    return this.entityManager.findAndCount(Campaign, {
      where: {
        ...(ids ? { id: Any(ids) } : {}),
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
      await this.entityManager.findOneByOrFail(Campaign, {
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

    const campaign = await this.entityManager.save(Campaign, campaignData)

    await this.campaignStreamService.saveMany(
      {
        campaignId: campaign.id,
        streams,
      },
      manager,
    )

    return campaign
  }
}
