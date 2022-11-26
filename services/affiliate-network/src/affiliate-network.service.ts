import { AffiliateNetworkSaveDTO } from './dto'
import { AffiliateNetwork } from './entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class AffiliateNetworkService {
  constructor(private readonly entityManager: EntityManager) {}

  async find(args: FindArgs) {
    const { ids } = args
    return this.entityManager.findAndCount(AffiliateNetwork, {
      where: {
        ...(ids ? { id: Any(ids) } : {}),
      },
    })
  }

  async save(input: AffiliateNetworkSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(AffiliateNetwork, {
        id: input.id,
      })
    }

    return this.entityManager.save(AffiliateNetwork, input)
  }
}
