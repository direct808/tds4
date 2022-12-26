import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { campaign } from '@tds/contracts/grpc'
import { convertEnum, GrpcValidationPipe } from '@tds/common'
import { CampaignService } from './campaign.service'
import { GetCampaignFullDTO } from './dto'
import { gql } from '@tds/contracts'
import { CampaignStream } from './entities'

@Controller()
@UsePipes(GrpcValidationPipe)
export class CampaignController
  implements Record<keyof campaign.CampaignService, unknown>
{
  constructor(private readonly campaignService: CampaignService) {}

  @GrpcMethod('CampaignService')
  async getCampaignFull(
    args: GetCampaignFullDTO,
  ): Promise<campaign.GetCampaignFullResponse> {
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
              campaign.StreamSchema,
              item.schema,
            ),
            actionType: convertEnum(
              gql.StreamActionType,
              campaign.StreamActionType,
              item.actionType,
            ),
            redirectType: convertEnum(
              gql.StreamRedirectType,
              campaign.StreamRedirectType,
              item.redirectType,
            ),
          }
        }),
      },
    }
    return res
  }
}
