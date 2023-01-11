import { campaign } from '@tds/contracts/grpc'
import { IsString, IsUUID, Length, ValidateIf } from 'class-validator'

export class GetCampaignFullDTO
  implements Record<keyof campaign.IGetCampaignFullRequest, unknown>
{
  @IsUUID('4')
  @ValidateIf((o: GetCampaignFullDTO) => o.code === undefined)
  id: string | undefined

  @IsString()
  @Length(6, 6)
  @ValidateIf((o: GetCampaignFullDTO) => o.id === undefined)
  code: string | undefined
}
