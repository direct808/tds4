import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Offer } from './entities'
import { OfferSaveDTO } from './dto'
import { ForeignService } from './foreign.service'

@Injectable()
export class OfferService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
  ) {}

  async find() {
    return this.entityManager.findAndCount(Offer)
  }

  async save(input: OfferSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(Offer, {
        id: input.id,
      })
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

    return this.entityManager.save(Offer, input)
  }
}
