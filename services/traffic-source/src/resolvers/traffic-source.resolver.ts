import { Resolver, ResolveReference } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { TrafficSourceLoader } from '../loaders'

@Resolver(gql.TrafficSource)
export class TrafficSourceResolver {
  constructor(private readonly loader: TrafficSourceLoader) {}

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string
    id: string
  }): Promise<gql.TrafficSource> {
    return this.loader.load(reference.id)
  }
}
