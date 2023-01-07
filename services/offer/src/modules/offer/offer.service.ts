import { Injectable } from '@nestjs/common'
import { Any, EntityManager } from 'typeorm'
import { Offer } from '../../entities'
import { OfferSaveDTO } from '../../dto'
import { ForeignService } from './foreign.service'
import { OfferGroupService } from './offer-group.service'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class OfferService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
    private readonly offerGroup: OfferGroupService,
  ) {}

  async find(args: Readonly<FindArgs> = {}) {
    const { ids } = args

    return this.entityManager.find(Offer, {
      where: {
        ...(ids ? { id: Any(ids) } : {}),
      },
    })
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

    if (input.groupId) {
      const groups = await this.offerGroup.find({
        ids: [input.groupId],
      })
      if (groups.length === 0) {
        throw new Error('Offer group not found')
      }
    }

    return this.entityManager.save(Offer, input)
  }
}
