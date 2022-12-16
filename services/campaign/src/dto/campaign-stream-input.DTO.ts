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

export class CampaignStreamInputDTO
  implements Record<keyof gql.CampaignStreamInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsEnum(gql.CampaignStreamSchema)
  schema!: gql.CampaignStreamSchema

  @ValidateIf(
    (data: CampaignStreamInputDTO) =>
      data.schema === gql.CampaignStreamSchema.ACTION,
  )
  @IsEnum(gql.StreamActionType)
  actionType: gql.StreamActionType | null | undefined

  @ValidateIf(
    (data: CampaignStreamInputDTO) =>
      data.actionType === gql.StreamActionType.TO_CAMPAIGN,
  )
  @IsUUID('4')
  actionCampaignId: string | null | undefined

  @ValidateIf((data: CampaignStreamInputDTO) =>
    [gql.StreamActionType.SHOW_HTML, gql.StreamActionType.SHOW_TEXT].includes(
      data.actionType!,
    ),
  )
  @IsString()
  actionContent: string | null | undefined

  @ValidateIf(
    (data: CampaignStreamInputDTO) =>
      data.schema === gql.CampaignStreamSchema.DIRECT_URL,
  )
  @IsEnum(gql.StreamRedirectType)
  redirectType: gql.StreamRedirectType | undefined

  @ValidateIf(
    (data: CampaignStreamInputDTO) =>
      data.schema === gql.CampaignStreamSchema.DIRECT_URL,
  )
  @IsUrl()
  redirectUrl: string | null | undefined
}
