import { IsIn, IsNotEmpty, IsNumberString, IsString } from 'class-validator'
import { Expose } from 'class-transformer'

export class AppEnvDTO {
  @Expose()
  @IsString()
  @IsIn(['development', 'production', 'test'])
  @IsNotEmpty()
  NODE_ENV: 'development' | 'production' | 'test' = 'production'

  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  APP_PORT!: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  SERVICE_AFFILIATE_NETWORK_HOST!: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  SERVICE_CAMPAIGN_HOST!: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  SERVICE_OFFER_HOST!: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  SERVICE_TRAFFIC_SOURCE_HOST!: string
}
