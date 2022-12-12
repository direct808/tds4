import { TGqlTypeGenerator } from '@tds/common'
import { gql } from '@tds/contracts'

export type TGqlCampaign = TGqlTypeGenerator<
  gql.Campaign & {
    trafficSourceId?: string
    groupId?: string
  },
  'trafficSource' | 'group' | 'streams'
>

export type TCampaignResolver = TGqlCampaign['resolver']
