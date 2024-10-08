import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { OfferGroupService, OfferService } from './modules/offer'
import { OfferGroupSaveDTO, OfferSaveDTO } from './dto'
import { gql } from '@tds/contracts'

@Injectable()
export class QueryService {
  constructor(
    private readonly offerService: OfferService,
    private readonly offerGroupService: OfferGroupService,
  ) {}

  @Query()
  async offerList(): Promise<gql.Query['offerList']> {
    const items = await this.offerService.find()

    return { items, totalCount: 0 }
  }

  @Mutation()
  async offerSave(
    @Args('input') input: OfferSaveDTO,
  ): Promise<gql.Mutation['offerSave']> {
    return { result: await this.offerService.save(input) }
  }

  @Mutation()
  offerGroupSave(
    @Args('input') input: OfferGroupSaveDTO,
  ): Promise<gql.Mutation['offerGroupSave']> {
    return this.offerGroupService.save(input)
  }
}
