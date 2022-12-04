import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { TGqlOffers, TOfferResolver } from './common'
import { OfferGroupService } from '../offer-group.service'

@Resolver(gql.Offer)
export class OfferResolver implements TOfferResolver {
  constructor(private readonly offerGroupService: OfferGroupService) {}

  @ResolveField('affiliateNetwork')
  async affiliateNetwork(
    @Parent() offer: TGqlOffers['flat'],
  ): Promise<Pick<gql.AffiliateNetwork, 'id'> | null> {
    if (!offer.affiliateNetworkId) {
      return null
    }
    return { id: offer.affiliateNetworkId }
  }

  @ResolveField('group')
  async group(@Parent() offer: TGqlOffers['flat']) {
    if (!offer.groupId) {
      return null
    }
    const groups = await this.offerGroupService.find({ ids: [offer.groupId] })
    if (!groups.length) {
      return null
    }
    return groups[0]
  }
}
