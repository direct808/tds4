import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { gql } from '@tds/contracts'
import { TCampaignResolver, TGqlCampaign } from './common'
import { CampaignGroupLoader } from '../loaders'

@Resolver(gql.Campaign)
export class CampaignResolver implements TCampaignResolver {
  constructor(private readonly campaignGroupDataLoader: CampaignGroupLoader) {}

  @ResolveField()
  async affiliateNetwork(
    @Parent() campaign: TGqlCampaign['flat'],
  ): Promise<Pick<gql.AffiliateNetwork, 'id'> | null> {
    if (!campaign.affiliateNetworkId) {
      return null
    }
    return { id: campaign.affiliateNetworkId }
  }

  @ResolveField()
  async group(@Parent() campaign: TGqlCampaign['flat']) {
    if (!campaign.groupId) {
      return null
    }
    return this.campaignGroupDataLoader.load(campaign.groupId)
  }
}
