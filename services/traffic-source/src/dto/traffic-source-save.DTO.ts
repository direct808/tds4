import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { gql } from '@tds/contracts'

export class TrafficSourceSaveDTO
  implements Record<keyof gql.TrafficSourceInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id!: string

  @IsString()
  @IsNotEmpty()
  name!: string
}
