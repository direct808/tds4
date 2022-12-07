import { Injectable } from '@nestjs/common'
import { Any, EntityManager } from 'typeorm'
import { CampaignGroup } from './entities'
import { CampaignGroupSaveDTO } from './dto'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class CampaignGroupService {
  constructor(private readonly entityManager: EntityManager) {}

  async find(input?: FindArgs) {
    return this.entityManager.find(CampaignGroup, {
      where: {
        ...(input?.ids?.length ? { id: Any(input.ids) } : {}),
      },
    })
  }

  async save(input: CampaignGroupSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(CampaignGroup, {
        id: input.id,
      })
    }

    return this.entityManager.save(CampaignGroup, input)
  }
}
