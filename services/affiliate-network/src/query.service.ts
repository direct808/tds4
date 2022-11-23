import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { AffiliateNetworkService } from './affiliate-network.service'
import { AffiliateNetworkSaveDTO } from './dto/affiliate-network-save.DTO'

@Injectable()
export class QueryService {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @Query()
  async affiliateNetworkList() {
    const [items, totalCount] = await this.affiliateNetworkService.find()
    return { items, totalCount }
  }

  @Mutation()
  affiliateNetworkSave(@Args('input') input: AffiliateNetworkSaveDTO) {
    return this.affiliateNetworkService.save(input)
  }
}
