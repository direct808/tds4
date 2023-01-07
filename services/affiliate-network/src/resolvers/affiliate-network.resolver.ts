import { Resolver, ResolveReference } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { AffiliateNetworkLoader } from '../modules/affiliate-network'

@Resolver(gql.AffiliateNetwork)
export class AffiliateNetworkResolver {
  constructor(private readonly loader: AffiliateNetworkLoader) {}

  @ResolveReference()
  resolveReference(reference: {
    __typename: string
    id: string
  }): Promise<gql.AffiliateNetwork> {
    return this.loader.load(reference.id)
  }
}
