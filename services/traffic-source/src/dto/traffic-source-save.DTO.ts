import { IsOptional, IsUUID, MinLength } from 'class-validator'

export class TrafficSourceSaveDTO {
  @IsUUID('4')
  @IsOptional()
  id!: string

  name!: string
}
