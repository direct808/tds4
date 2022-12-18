import { campaign } from '@tds/contracts'
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'

export class GetCampaignListDTO
  implements Record<keyof campaign.GetCampaignListRequest, unknown>
{
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  codes: string[] | undefined
}
