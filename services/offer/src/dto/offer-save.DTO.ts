import { IsOptional, IsUUID } from 'class-validator'

export class OfferSaveDTO {
  @IsUUID('4')
  @IsOptional()
  id!: string

  name!: string

  @IsUUID('4')
  @IsOptional()
  declare affiliateNetworkId: string
}
