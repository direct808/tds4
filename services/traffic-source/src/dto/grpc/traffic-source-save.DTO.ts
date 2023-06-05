import {
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'
import { trafficSource } from '@tds/contracts/grpc'
import { Transform } from 'class-transformer'

export class TrafficSourceSaveDTO
  implements Record<keyof trafficSource.ITrafficSourceSaveRequest, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsBoolean()
  @IsNotEmpty()
  acceptParameters!: boolean

  @IsInt()
  @Min(0)
  @Max(100)
  declare trafficLoss: number

  @IsArray()
  @IsString({ each: true })
  declare postbackStatuses: string[]

  @Transform((o) => JSON.parse(o.value))
  declare parameters: object
}
