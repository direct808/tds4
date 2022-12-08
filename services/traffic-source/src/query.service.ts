import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { TrafficSourceSaveDTO } from './dto'
import { TrafficSourceService } from './traffic-source.service'
import { gql } from '@tds/contracts'

@Injectable()
export class QueryService {
  constructor(private readonly affiliateNetworkService: TrafficSourceService) {}

  @Query()
  async trafficSourceList(): Promise<gql.Query['trafficSourceList']> {
    const items = await this.affiliateNetworkService.find()
    return { items, totalCount: 0 }
  }

  @Mutation()
  trafficSourceSave(
    @Args('input') input: TrafficSourceSaveDTO,
  ): Promise<gql.Mutation['trafficSourceSave']> {
    return this.affiliateNetworkService.save(input)
  }
}
