import { IsArray, IsInt, IsOptional, IsUUID } from 'class-validator'
import { affiliateNetwork } from '@tds/contracts'

export class GetAffiliateNetworkListDTO
  implements
    Record<keyof affiliateNetwork.GetAffiliateNetworkListRequest, unknown>
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
