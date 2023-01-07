import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { TrafficSourceSaveDTO } from './dto'
import { TrafficSourceService } from './modules/traffic-source'
import { gql } from '@tds/contracts'

@Injectable()
export class QueryService {
  constructor(private readonly trafficSourceService: TrafficSourceService) {}

  @Query()
  async trafficSourceList(): Promise<gql.Query['trafficSourceList']> {
    const items = await this.trafficSourceService.find()

    return { items, totalCount: 0 }
  }

  @Mutation()
  trafficSourceSave(
    @Args('input') input: TrafficSourceSaveDTO,
  ): Promise<gql.Mutation['trafficSourceSave']> {
    return this.trafficSourceService.save(input)
  }
}
