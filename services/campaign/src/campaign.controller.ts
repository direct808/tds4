import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { campaign } from '@tds/contracts'
import { GrpcValidationPipe } from '@tds/common'
import { CampaignService } from './campaign.service'
import { GetCampaignListDTO } from './dto/get-campaign-list.DTO'
import { CampaignStreamService } from './campaign-stream.service'
import { GetCampaignStreamListDTO } from './dto/get-campaign-stream-list.DTO'

@Controller()
@UsePipes(GrpcValidationPipe)
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly campaignStreamService: CampaignStreamService,
  ) {}

  @GrpcMethod('CampaignService')
  async getCampaignList(
    args: GetCampaignListDTO,
  ): Promise<campaign.GetCampaignListResponse> {
    const result = await this.campaignService.find(args)
    return { result }
  }

  @GrpcMethod('CampaignService')
  async getCampaignStreamList(
    args: GetCampaignStreamListDTO,
  ): Promise<campaign.GetCampaignListResponse> {
    const result = await this.campaignStreamService.findByCampaignIds([
      args.campaignId,
    ])
    return { result }
  }
}
