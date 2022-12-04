import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { AffiliateNetwork } from '../entities'
import { AffiliateNetworkService } from '../affiliate-network.service'

@Injectable({ scope: Scope.REQUEST })
export class AffiliateNetworkLoader extends DataLoader<
  string,
  AffiliateNetwork
> {
  constructor(private readonly service: AffiliateNetworkService) {
    super(async (ids) => service.find({ ids: [...ids] }))
  }
}
