import { IsOptional, IsString, IsUUID } from 'class-validator'

export class OfferGroupSaveDTO {
  @IsUUID('4')
  @IsOptional()
  id?: string

  @IsString()
  name!: string
}
