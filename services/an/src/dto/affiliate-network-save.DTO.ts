import { IsOptional, IsUUID, MinLength } from 'class-validator';

export class AffiliateNetworkSaveDTO {
  @IsUUID('4')
  @IsOptional()
  id!: string;

  // @MinLength(100)
  name!: string;
}
