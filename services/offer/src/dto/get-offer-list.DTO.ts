import { IsArray, IsOptional, IsUUID } from 'class-validator'
import { tds } from '@tds/contracts/grpc/offer'
import offer = tds.offer

export class GetOfferListDTO
  implements Record<keyof offer.GetOfferListRequest, unknown>
{
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  ids: string[] | undefined
}
