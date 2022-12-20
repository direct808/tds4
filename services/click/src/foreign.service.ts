import { campaign } from '@tds/contracts/grpc'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly campaignService

  constructor(private readonly configService: ConfigService) {
    this.campaignService = this.configService.getGrpcCampaignService()
  }

  getCampaignList(
    args: campaign.GetCampaignListRequest,
  ): Promise<campaign.GetCampaignListResponse> {
    return firstValueFrom(this.campaignService.getCampaignList(args))
  }

  async getCampaignStreamList(
    args: campaign.GetCampaignStreamListRequest,
  ): Promise<campaign.CampaignStream[]> {
    const { result } = await firstValueFrom(
      this.campaignService.getCampaignStreamList(args),
    )
    return result ?? []
  }
}
