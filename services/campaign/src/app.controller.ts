import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { grpc } from '@tds/contracts'
import { convertEnum, GrpcValidationPipe } from '@tds/common'
import { CampaignService } from './modules/campaign'
import { GetCampaignFullDTO } from './dto'
import { gql } from '@tds/contracts'
import { CampaignStream } from './entities'

@Controller()
@UsePipes(GrpcValidationPipe)
// implements Record<keyof grpc.campaign.ICampaignService, unknown>
export class AppController {
  constructor(private readonly campaignService: CampaignService) {}

  @GrpcMethod('CampaignService')
  async getCampaignFull(
    args: GetCampaignFullDTO,
  ): Promise<grpc.campaign.IGetCampaignFullResponse> {
    const result = await this.campaignService.full(args)

    if (!result) {
      return {}
    }

    const res = {
      campaign: {
        ...result,
        streams: result.streams.map((item: CampaignStream) => {
          return {
            ...item,
            schema: convertEnum(
              gql.CampaignStreamSchema,
              grpc.campaign.StreamSchema,
              item.schema,
            ),
            actionType: convertEnum(
              gql.StreamActionType,
              grpc.global.ActionType,
              item.actionType,
            ),
            redirectType: convertEnum(
              gql.StreamRedirectType,
              grpc.global.RedirectType,
              item.redirectType,
            ),
          }
        }),
      },
    }

    return res
  }
}
