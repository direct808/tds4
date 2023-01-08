import { join } from 'path'
import { DBEnvDTO, defaultDatabaseConfig, getEnvConfig } from '@tds/common'
import { Injectable } from '@nestjs/common'
import { EnvDTO } from '@tds/common/env/env.DTO'
import { AppEnvDTO } from './app-env.DTO'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: join(__dirname, './../../../../../../.env') })
    dotenv.config({ path: join(__dirname, './../../../.env') })
  })
}

@Injectable()
export class ConfigService {
  env: AppEnvDTO & DBEnvDTO & EnvDTO

  constructor() {
    this.env = {
      ...getEnvConfig(AppEnvDTO),
      ...getEnvConfig(DBEnvDTO),
      ...getEnvConfig(EnvDTO),
    }
  }

  get typeOrmConfig(): ReturnType<typeof defaultDatabaseConfig> {
    return {
      ...defaultDatabaseConfig({
        entities: [join(__dirname, '../../entities/*.entity.{ts,js}')],
        schema: 'traffic_source',
        dbEnv: this.env,
      }),
    }
  }
}
