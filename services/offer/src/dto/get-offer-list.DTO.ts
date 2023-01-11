import { IsArray, IsOptional, IsUUID } from 'class-validator'
import { offer } from '@tds/contracts/grpc'

export class GetOfferListDTO
  implements Record<keyof offer.IGetOfferListRequest, unknown>
{
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  ids: string[] | undefined
}
