import { IsOptional, IsString, IsUUID } from 'class-validator'
import { gql } from '@tds/contracts'

export class OfferGroupSaveDTO
  implements Record<keyof gql.OfferGroupInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  name!: string
}
