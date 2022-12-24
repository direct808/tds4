import { IsBoolean, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'
import { gql } from '@tds/contracts'

export class StreamOfferInputDTO
  implements Record<keyof gql.StreamOfferInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id!: string

  @IsUUID('4')
  offerId!: string

  @IsInt()
  @Min(1)
  @Max(100)
  percent!: number

  @IsBoolean()
  active!: boolean
}
