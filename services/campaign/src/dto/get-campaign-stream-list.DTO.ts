import { campaign } from '@tds/contracts/grpc'
import { IsUUID } from 'class-validator'

export class GetCampaignStreamListDTO
  implements Record<keyof campaign.GetCampaignStreamListRequest, unknown>
{
  @IsUUID('4')
  campaignId!: string
}
