import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { StreamOfferLoader } from '../loaders'

@Resolver(gql.CampaignStream)
export class CampaignStreamResolver {
  constructor(private readonly streamOfferLoader: StreamOfferLoader) {}

  @ResolveField()
  streamOffers(
    @Parent() stream: gql.CampaignStream,
  ): Promise<gql.StreamOffer[]> {
    return this.streamOfferLoader.load(stream.id)
  }
}
