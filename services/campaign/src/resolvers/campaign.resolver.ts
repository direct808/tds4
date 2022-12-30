import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { TCampaignResolver, TGqlCampaign } from './common'
import { CampaignGroupLoader, CampaignStreamLoader } from '../loaders'
import { CampaignStreamService } from '../campaign-stream.service'

@Resolver(gql.Campaign)
export class CampaignResolver implements TCampaignResolver {
  constructor(
    private readonly campaignGroupLoader: CampaignGroupLoader,
    private readonly campaignStreamService: CampaignStreamService,
    private readonly streamLoader: CampaignStreamLoader,
  ) {}

  @ResolveField()
  async trafficSource(
    @Parent() campaign: TGqlCampaign['flat'],
  ): Promise<Pick<gql.TrafficSource, 'id'> | null> {
    if (!campaign.trafficSourceId) {
      return null
    }

    return { id: campaign.trafficSourceId }
  }

  @ResolveField()
  async group(@Parent() campaign: TGqlCampaign['flat']) {
    if (!campaign.groupId) {
      return null
    }

    return this.campaignGroupLoader.load(campaign.groupId)
  }

  @ResolveField()
  async streams(
    @Parent() campaign: TGqlCampaign['flat'],
  ): Promise<gql.CampaignStream[]> {
    return this.streamLoader.load(campaign.id)
  }
}
