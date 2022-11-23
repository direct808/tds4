import { AffiliateNetworkSaveDTO } from './dto'
import { AffiliateNetwork } from './entities'
import { EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AffiliateNetworkService {
  constructor(private readonly entityManager: EntityManager) {}

  async find() {
    return this.entityManager.findAndCount(AffiliateNetwork)
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
