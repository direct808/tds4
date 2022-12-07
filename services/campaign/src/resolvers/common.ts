import { TGqlTypeGenerator } from '@tds/common'
import { gql } from '@tds/contracts'

export type TGqlCampaign = TGqlTypeGenerator<
  gql.Campaign & {
    affiliateNetworkId?: string
    groupId?: string
  },
  'affiliateNetwork' | 'group'
>

export type TCampaignResolver = TGqlCampaign['resolver']
