import { Resolver, ResolveReference } from '@nestjs/graphql'
import { AffiliateNetworkLoader } from './loaders'
import { gql } from '@tds/contracts'

@Resolver(gql.AffiliateNetwork)
export class AfResolver {
  constructor(private readonly loader: AffiliateNetworkLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.loader.load(reference.id)
  }
}
