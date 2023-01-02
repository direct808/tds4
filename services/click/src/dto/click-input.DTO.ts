import {
  IsArray,
  IsIP,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'
import { click } from '@tds/contracts/grpc'
import { Transform, Type } from 'class-transformer'

export class ClickInputDTO
  implements Record<keyof click.AddClickRequest, unknown>
{
  @IsString()
  @Length(6, 6)
  campaignCode!: string

  @IsIP()
  @IsNotEmpty()
  ip!: string

  @IsArray()
  @ValidateNested()
  @Type(() => HeaderDTO)
  headers!: HeaderDTO[]

  @IsString()
  query = ''
}

export class HeaderDTO implements Record<keyof click.KeyVal, unknown> {
  @IsString()
  @IsLowercase()
  @Transform((o) => o.value.toLowerCase())
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsOptional()
  @Transform((o) => o.value || null)
  value!: string
}
