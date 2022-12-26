import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { campaign } from '@tds/contracts/grpc'
import { convertEnum, GrpcValidationPipe } from '@tds/common'
import { CampaignService } from './campaign.service'
import { GetCampaignListDTO, GetCampaignStreamListDTO } from './dto'
import { CampaignStreamService } from './campaign-stream.service'
import { gql } from '@tds/contracts'

@Controller()
@UsePipes(GrpcValidationPipe)
export class CampaignController
  implements Record<keyof campaign.CampaignService, unknown>
{
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
  ): Promise<campaign.GetCampaignStreamListResponse> {
    const result = await this.campaignStreamService.findByCampaignIds([
      args.campaignId,
    ])
    return {
      result: result.map((item) => ({
        ...item,
        schema: convertEnum(
          gql.CampaignStreamSchema,
          campaign.StreamSchema,
          item.schema,
        ),
        redirectType: convertEnum(
          gql.StreamRedirectType,
          campaign.StreamRedirectType,
          item.redirectType,
        ),
        actionType: convertEnum(
          gql.StreamActionType,
          campaign.StreamActionType,
          item.actionType,
        ),
      })),
    }
  }
}
