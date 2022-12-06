import { CampaignSaveDTO } from './dto'
import { Campaign } from './entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class CampaignService {
  constructor(private readonly entityManager: EntityManager) {}

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

    return this.entityManager.save(Campaign, input)
  }
}
