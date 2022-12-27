import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateIf,
} from 'class-validator'
import { gql } from '@tds/contracts'
import {
  OfferActionType,
  OfferRedirectType,
  OfferType,
} from '@tds/contracts/gql'

export class OfferSaveDTO implements Record<keyof gql.OfferSaveInput, unknown> {
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsUUID('4')
  @IsOptional()
  affiliateNetworkId: string | null | undefined

  @IsUUID('4')
  @IsOptional()
  groupId: string | null | undefined

  @IsEnum(OfferType)
  type!: OfferType

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.LOCAL)
  @IsString()
  file: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.REDIRECT)
  @IsEnum(OfferRedirectType)
  redirectType: OfferRedirectType | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.REDIRECT)
  @IsUrl({ require_protocol: true })
  redirectUrl: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.PRELOAD)
  @IsUrl({ require_protocol: true })
  preloadUrl: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) => data.type === OfferType.ACTION)
  @IsEnum(OfferActionType)
  actionType: OfferActionType | null | undefined

  @ValidateIf(
    (data: OfferSaveDTO) => data.actionType === OfferActionType.TO_CAMPAIGN,
  )
  @IsUUID('4')
  actionCampaignId: string | null | undefined

  @ValidateIf((data: OfferSaveDTO) =>
    [OfferActionType.SHOW_HTML, OfferActionType.SHOW_TEXT].includes(
      data.actionType!,
    ),
  )
  @IsString()
  actionContent: string | null | undefined
}
