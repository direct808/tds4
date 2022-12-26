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
  getCampaignFull(
    args: campaign.GetCampaignFullRequest,
  ): Promise<campaign.GetCampaignFullResponse> {
    return firstValueFrom(this.campaignService.getCampaignFull(args))
  }
}
