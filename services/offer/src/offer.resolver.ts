import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver('Offer')
export class OfferResolver {
  @ResolveField('affiliateNetwork')
  async affiliateNetwork(@Parent() input: any) {
    return { __typename: 'AffiliateNetwork', id: input.affiliateNetworkId }
  }
}
