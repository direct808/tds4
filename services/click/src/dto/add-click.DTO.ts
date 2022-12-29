import {
  IsArray,
  IsIP,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'
import { click } from '@tds/contracts/grpc'
import { Type } from 'class-transformer'

export class AddClickDTO
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
}

class HeaderDTO implements Record<keyof click.Header, unknown> {
  @IsString()
  @IsLowercase()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  value!: string
}
