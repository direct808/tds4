import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { TrafficSource } from '@tds/contracts/gql'
import { TrafficSourceService } from '../traffic-source.service'

@Injectable({ scope: Scope.REQUEST })
export class TrafficSourceLoader extends DataLoader<string, TrafficSource> {
  constructor(private readonly service: TrafficSourceService) {
    super(async (ids) => service.find({ ids: [...ids] }))
  }
}
