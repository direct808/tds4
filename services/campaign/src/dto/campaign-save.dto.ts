import { IsOptional, IsString, IsUUID } from 'class-validator'
import { gql } from '@tds/contracts'

export class CampaignSaveDTO
  implements Record<keyof gql.CampaignInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id!: string

  @IsString()
  name!: string
}
