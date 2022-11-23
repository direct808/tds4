import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Expose, Transform } from 'class-transformer'

export class DatabaseEnvDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST!: string

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: string | undefined }) =>
    value ? Number(value) : undefined,
  )
  DB_PORT!: number

  @Expose()
  @IsString()
  DB_USER!: string

  @Expose()
  @IsString()
  DB_PASS!: string
}
