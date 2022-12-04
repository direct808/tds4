import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { OfferGroup } from '../entities'
import { OfferGroupService } from '../offer-group.service'

@Injectable({ scope: Scope.REQUEST })
export class OfferGroupLoader extends DataLoader<string, OfferGroup> {
  constructor(private readonly offerGroupService: OfferGroupService) {
    super((ids) => offerGroupService.find({ ids: [...ids] }))
  }
}
