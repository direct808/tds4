import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { TGqlOffers, TOfferResolver } from './common'
import { OfferGroupLoader } from '../loaders'

@Resolver(gql.Offer)
export class OfferResolver implements TOfferResolver {
  constructor(private readonly offerGroupDataLoader: OfferGroupLoader) {}

  @ResolveField()
  async affiliateNetwork(
    @Parent() offer: TGqlOffers['flat'],
  ): Promise<Pick<gql.AffiliateNetwork, 'id'> | null> {
    if (!offer.affiliateNetworkId) {
      return null
    }
    return { id: offer.affiliateNetworkId }
  }

  @ResolveField()
  async group(@Parent() offer: TGqlOffers['flat']) {
    if (!offer.groupId) {
      return null
    }
    return this.offerGroupDataLoader.load(offer.groupId)
  }
}
