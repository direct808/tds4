import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Offer } from './entities'
import { OfferSaveDTO } from './dto'
import { AffiliateNetworkService } from './affiliate-network.service'

@Injectable()
export class OfferService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly affiliateNetworkService: AffiliateNetworkService,
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

    const af = await this.affiliateNetworkService.getAffiliateNetworkList()

    return this.entityManager.save(Offer, input)
  }
}
