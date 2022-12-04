import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateIf,
} from 'class-validator'
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

  @IsUUID('4')
  @IsOptional()
  groupId?: string | null

  @IsEnum(OfferType)
  type!: OfferType

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.local)
  @IsString()
  file?: string

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.redirect)
  @IsEnum(OfferRedirectType)
  redirectType?: OfferRedirectType

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.redirect)
  @IsUrl()
  redirectUrl?: string

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.preload)
  @IsUrl()
  preloadUrl?: string

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.action)
  @IsEnum(OfferActionType)
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
