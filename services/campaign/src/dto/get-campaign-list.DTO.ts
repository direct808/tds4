import { campaign } from '@tds/contracts/grpc'
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator'

export class GetCampaignListDTO
  implements Record<keyof campaign.GetCampaignListRequest, unknown>
{
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Length(6, 6, { each: true })
  codes: string[] | undefined

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsUUID(4, { each: true })
  ids: string[] | undefined
}
