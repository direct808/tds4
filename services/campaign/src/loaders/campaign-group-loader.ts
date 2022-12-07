import DataLoader from 'dataloader'
import { Injectable, Scope } from '@nestjs/common'
import { CampaignGroup } from '../entities'
import { CampaignGroupService } from '../campaign-group.service'

@Injectable({ scope: Scope.REQUEST })
export class CampaignGroupLoader extends DataLoader<string, CampaignGroup> {
  constructor(private readonly campaignGroupService: CampaignGroupService) {
    super((ids) => campaignGroupService.find({ ids: [...ids] }))
  }
}
