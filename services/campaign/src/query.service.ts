import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { CampaignService } from './campaign.service'
import { CampaignSaveDTO } from './dto'
import { gql } from '@tds/contracts'

@Injectable()
export class QueryService {
  constructor(private readonly campaignService: CampaignService) {}

  @Query()
  async campaignList(): Promise<gql.Query['campaignList']> {
    const items = await this.campaignService.find({})
    return { items, totalCount: 0 }
  }

  @Mutation()
  campaignSave(
    @Args('input') input: CampaignSaveDTO,
  ): Promise<gql.Mutation['campaignSave']> {
    return this.campaignService.save(input)
  }
}
