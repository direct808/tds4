import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { TGqlOffers, TOfferResolver } from './common'

@Resolver(gql.Offer)
export class OfferResolver implements TOfferResolver {
  @ResolveField('affiliateNetwork')
  async affiliateNetwork(
    @Parent() offer: TGqlOffers['flat'],
  ): Promise<Pick<gql.AffiliateNetwork, 'id'> | null> {
    if (!offer.affiliateNetworkId) {
      return null
    }
    return { id: offer.affiliateNetworkId }
  }
}
