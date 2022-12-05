import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateIf,
} from 'class-validator'
import { OfferActionType, OfferRedirectType, OfferType } from '../entities'
import { gql } from '@tds/contracts'

export class OfferSaveDTO implements Record<keyof gql.OfferInput, unknown> {
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  name!: string

  @IsUUID('4')
  @IsOptional()
  affiliateNetworkId: string | null | undefined

  @IsUUID('4')
  @IsOptional()
  groupId: string | null | undefined

  @IsEnum(OfferType)
  type!: OfferType

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.local)
  @IsString()
  file: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.redirect)
  @IsEnum(OfferRedirectType)
  redirectType: OfferRedirectType | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.redirect)
  @IsUrl()
  redirectUrl: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.preload)
  @IsUrl()
  preloadUrl: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.action)
  @IsEnum(OfferActionType)
  actionType: OfferActionType | null | undefined

  @ValidateIf(
    (data: OfferSaveDTO) => data.actionType === OfferActionType.toCampaign,
  )
  @IsUUID('4')
  actionCampaignId: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) =>
    [OfferActionType.showHtml, OfferActionType.showText].includes(
      data.actionType!,
    ),
  )
  @IsString()
  actionContent: string | null | undefined
}
