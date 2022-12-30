import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { CampaignStream } from '../entities'
import { CampaignStreamService } from '../campaign-stream.service'

@Injectable({ scope: Scope.REQUEST })
export class CampaignStreamLoader extends DataLoader<string, CampaignStream[]> {
  constructor(campaignStreamService: CampaignStreamService) {
    super(async (ids) => {
      const result = await campaignStreamService.findByCampaignIds([...ids])

      const byId = result.reduce((acc, item) => {
        const key = item.campaignId
        if (!acc.has(key)) {
          acc.set(key, [])
        }

        acc.get(key)!.push(item)

        return acc
      }, new Map<string, CampaignStream[]>())

      return ids.map((id) => byId.get(id) ?? [])
    })
  }
}
