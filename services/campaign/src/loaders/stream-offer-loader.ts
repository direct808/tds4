import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { StreamOffer } from '../entities'
import { StreamOfferService } from '../stream-offer.service'

@Injectable({ scope: Scope.REQUEST })
export class StreamOfferLoader extends DataLoader<string, StreamOffer[]> {
  constructor(campaignStreamService: StreamOfferService) {
    super(async (ids) => {
      const result = await campaignStreamService.findByStreamIds([...ids])

      const byId = result.reduce((acc, item) => {
        const key = item.streamId
        if (!acc.has(key)) {
          acc.set(key, [])
        }

        acc.get(key)!.push(item)
        return acc
      }, new Map<string, StreamOffer[]>())

      return ids.map((id) => byId.get(id) ?? [])
    })
  }
}
