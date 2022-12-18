import { campaign } from '@tds/contracts'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly campaignService = this.configService.getGrpcCampaignService()

  constructor(private readonly configService: ConfigService) {}

  getCampaignList(
    args: campaign.GetCampaignListRequest,
  ): Promise<campaign.GetCampaignListResponse> {
    return firstValueFrom(this.campaignService.getCampaignList(args))
  }
}
