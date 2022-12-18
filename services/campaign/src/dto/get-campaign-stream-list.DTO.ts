import { campaign } from '@tds/contracts'
import { IsUUID } from 'class-validator'

export class GetCampaignStreamListDTO
  implements Record<keyof campaign.GetCampaignStreamListRequest, unknown>
{
  @IsUUID('4')
  campaignId!: string
}
