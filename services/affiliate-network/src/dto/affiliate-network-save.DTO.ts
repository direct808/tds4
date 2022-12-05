import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator'
import { gql } from '@tds/contracts'

export class AffiliateNetworkSaveDTO
  implements Record<keyof gql.AffiliateNetworkInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id!: string

  @IsString()
  name!: string

  @IsOptional()
  offerParam: string | null | undefined

  @IsUrl()
  @IsOptional()
  postbackUrl: string | null | undefined
}
