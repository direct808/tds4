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
  PORT!: string
}
