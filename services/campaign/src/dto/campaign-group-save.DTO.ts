import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { gql } from '@tds/contracts'

export class CampaignGroupSaveDTO
  implements Record<keyof gql.CampaignGroupSaveInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  @IsNotEmpty()
  name!: string
}
