import { IsArray, IsInt, IsOptional, IsUUID } from 'class-validator'
import { trafficSource } from '@tds/contracts/grpc'

export class GetTrafficSourceListDTO
  implements Record<keyof trafficSource.IGetTrafficSourceListRequest, unknown>
{
  @IsInt()
  @IsOptional()
  skip: number | undefined

  @IsInt()
  @IsOptional()
  take: number | undefined

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  ids: string[] | undefined
}
