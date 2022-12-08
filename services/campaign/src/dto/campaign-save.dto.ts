import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'
import { gql } from '@tds/contracts'

export class CampaignSaveDTO
  implements Record<keyof gql.CampaignSaveInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  name!: string

  @IsUUID('4')
  @IsOptional()
  groupId: string | undefined | null

  @IsUUID('4')
  @IsOptional()
  trafficSourceId: string | undefined | null

  @IsBoolean()
  active = true
}
