import { IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator'
import { Expose, Transform } from 'class-transformer'

export class EnvDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  declare SECRET: string

  @Expose()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }: { value: string | undefined }) =>
    value ? Number(value) : undefined,
  )
  declare SERVICE_API_GATEWAY_PORT: number

  @Expose()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }: { value: string | undefined }) =>
    value ? Number(value) : undefined,
  )
  declare SERVICE_AFFILIATE_NETWORK_PORT: number

  @Expose()
  @IsString()
  @IsNotEmpty()
  declare SERVICE_AFFILIATE_NETWORK_GRPC_URL: string

  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  declare SERVICE_CAMPAIGN_PORT: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  declare SERVICE_CAMPAIGN_GRPC_URL: string

  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  declare SERVICE_CLICK_PORT: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  declare SERVICE_CLICK_GRPC_URL: string

  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  declare SERVICE_OFFER_PORT: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  declare SERVICE_OFFER_GRPC_URL: string

  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  declare SERVICE_TRAFFIC_SOURCE_PORT: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  declare SERVICE_TRAFFIC_SOURCE_GRPC_URL: string
}
