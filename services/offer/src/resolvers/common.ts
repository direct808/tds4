import { TGqlTypeGenerator } from '@tds/common'
import { gql } from '@tds/contracts'

export type TGqlOffers = TGqlTypeGenerator<
  gql.Offer & {
    affiliateNetworkId?: string
  },
  'affiliateNetwork'
>

export type TOfferResolver = TGqlOffers['resolver']
