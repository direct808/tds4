import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { AffiliateNetworkService } from './modules/affiliate-network'
import { AffiliateNetworkSaveDTO } from './dto'
import { gql } from '@tds/contracts'

@Injectable()
export class QueryService {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @Query()
  async affiliateNetworkList(): Promise<gql.Query['affiliateNetworkList']> {
    const [items, totalCount] = await this.affiliateNetworkService.findAndCount(
      {},
    )

    return { items, totalCount }
  }

  @Mutation()
  affiliateNetworkSave(
    @Args('input') input: AffiliateNetworkSaveDTO,
  ): Promise<gql.Mutation['affiliateNetworkSave']> {
    return this.affiliateNetworkService.save(input)
  }
}
