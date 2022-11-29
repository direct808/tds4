import { IsIn, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'
import { OfferActionType, OfferRedirectType, OfferType } from '../entities'

export class OfferSaveDTO {
  @IsUUID('4')
  @IsOptional()
  id?: string

  @IsString()
  name!: string

  @IsUUID('4')
  @IsOptional()
  affiliateNetworkId?: string | null

  @IsIn(Object.values(OfferType))
  type!: OfferType

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.local)
  @IsString()
  file?: string

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.redirect)
  @IsIn(Object.values(OfferRedirectType))
  redirectType?: OfferRedirectType

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.redirect)
  @IsString()
  redirectUrl?: string

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.preload)
  @IsString()
  preloadUrl?: string

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.action)
  @IsIn(Object.values(OfferActionType))
  actionType?: OfferActionType

  @ValidateIf(
    (data: OfferSaveDTO) => data.actionType === OfferActionType.toCampaign,
  )
  @IsUUID('4')
  actionCampaignId?: string

  @ValidateIf((data: OfferSaveDTO) =>
    [OfferActionType.showHtml, OfferActionType.showText].includes(
      data.actionType!,
    ),
  )
  @IsString()
  actionContent?: string
}
