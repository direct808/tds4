import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { TrafficSourceSaveDTO } from './dto/traffic-source-save.DTO'
import { TrafficSourceService } from './traffic-source.service'

@Injectable()
export class QueryService {
  constructor(private readonly affiliateNetworkService: TrafficSourceService) {}

  @Query()
  async trafficSourceList() {
    const [items, totalCount] = await this.affiliateNetworkService.find()
    return { items, totalCount }
  }

  @Mutation()
  trafficSourceSave(@Args('input') input: TrafficSourceSaveDTO) {
    return this.affiliateNetworkService.save(input)
  }
}
