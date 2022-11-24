import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { OfferService } from './offer.service'
import { OfferSaveDTO } from './dto'

@Injectable()
export class QueryService {
  constructor(private readonly offerService: OfferService) {}

  @Query()
  async offerList() {
    const [items, totalCount] = await this.offerService.find()
    return { items, totalCount }
  }

  @Mutation()
  offerSave(@Args('input') input: OfferSaveDTO) {
    return this.offerService.save(input)
  }
}
