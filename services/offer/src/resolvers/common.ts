import { TGqlTypeGenerator } from '@tds/common'
import { gql } from '@tds/contracts'

export type TGqlOffers = TGqlTypeGenerator<
  gql.Offer & {
    affiliateNetworkId?: string
    groupId?: string
  },
  'affiliateNetwork' | 'group'
>

export type TOfferResolver = TGqlOffers['resolver']
