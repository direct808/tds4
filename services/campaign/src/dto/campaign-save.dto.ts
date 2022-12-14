import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator'
import { gql } from '@tds/contracts'
import { CampaignStreamInputDTO } from './campaign-stream-input.DTO'
import { Type } from 'class-transformer'

export class CampaignSaveDTO
  implements Record<keyof gql.CampaignSaveInput, unknown>
{
  @IsUUID('4')
  @IsOptional()
  id: string | undefined

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsUUID('4')
  @IsOptional()
  groupId: string | undefined | null

  @IsUUID('4')
  @IsOptional()
  trafficSourceId: string | undefined | null

  @IsBoolean()
  active = true

  @IsArray()
  @ValidateNested()
  @Type(() => CampaignStreamInputDTO)
  streams: CampaignStreamInputDTO[] = []
}
