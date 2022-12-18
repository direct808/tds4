import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { campaign } from '@tds/contracts'
import { GrpcValidationPipe } from '@tds/common'
import { CampaignService } from './campaign.service'
import { GetCampaignListDTO } from './dto/get-campaign-list.DTO'

@Controller()
@UsePipes(GrpcValidationPipe)
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @GrpcMethod('CampaignService')
  async getCampaignList(
    args: GetCampaignListDTO,
  ): Promise<campaign.GetCampaignListResponse> {
    const result = await this.campaignService.find(args)
    return { result }
  }
}
