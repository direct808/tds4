import { Injectable } from '@nestjs/common'
import { DBEnvDTO, defaultDatabaseConfig, getEnvConfig } from '@tds/common'
import { AppEnvDTO } from './app-env.DTO'
import { join } from 'path'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: join(__dirname, './../../../../../../.env') })
    dotenv.config({ path: join(__dirname, './../../../.env') })
  })
}

@Injectable()
export class ConfigService {
  env: AppEnvDTO & DBEnvDTO

  constructor() {
    this.env = {
      ...getEnvConfig(AppEnvDTO),
      ...getEnvConfig(DBEnvDTO),
    }
  }

  get typeOrmConfig(): ReturnType<typeof defaultDatabaseConfig> {
    return {
      ...defaultDatabaseConfig({
        entities: [join(__dirname, '../../entities/*.entity.{ts,js}')],
        schema: 'affiliate_network',
        dbEnv: this.env,
      }),
    }
  }
}
