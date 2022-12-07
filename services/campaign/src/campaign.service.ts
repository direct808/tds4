import { CampaignSaveDTO } from './dto'
import { Campaign } from './entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { CampaignGroupService } from './campaign-group.service'
import { ForeignService } from './foreign.service'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class CampaignService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly campaignGroupService: CampaignGroupService,
    private readonly foreignService: ForeignService,
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

  async save(input: CampaignSaveDTO) {
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

    if (input.affiliateNetworkId) {
      const ans = await this.foreignService.getAffiliateNetworkList({
        ids: [input.affiliateNetworkId],
      })
      if (ans.length === 0) {
        throw new Error('affiliateNetwork not found')
      }
      console.log('ans.length', ans.length)
    }

    return this.entityManager.save(Campaign, input)
  }
}
