import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { OfferService } from './offer.service'
import { OfferGroupSaveDTO, OfferSaveDTO } from './dto'
import { OfferGroupService } from './offer-group.service'
import { gql } from '@tds/contracts'

@Injectable()
export class QueryService {
  constructor(
    private readonly offerService: OfferService,
    private readonly offerGroupService: OfferGroupService,
  ) {}

  @Query()
  async offerList(): Promise<gql.Query['offerList']> {
    const [items, totalCount] = await this.offerService.find()
    return { items, totalCount }
  }

  @Mutation()
  offerSave(
    @Args('input') input: OfferSaveDTO,
  ): Promise<gql.Mutation['offerSave']> {
    return this.offerService.save(input)
  }

  @Mutation()
  offerGroupSave(
    @Args('input') input: OfferGroupSaveDTO,
  ): Promise<gql.Mutation['offerGroupSave']> {
    return this.offerGroupService.save(input)
  }
}
