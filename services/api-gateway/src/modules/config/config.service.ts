import { Injectable } from '@nestjs/common'
import { contractsPath, getEnvConfig, makeGrpcService } from '@tds/common'
import { AppEnvDTO } from './app-env.DTO'
import { join } from 'path'
import { click } from '@tds/contracts/grpc'
import { EnvDTO } from '@tds/common/env/env.DTO'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: join(__dirname, './../../../../../../.env') })
    dotenv.config({ path: join(__dirname, './../../../.env') })
  })
}

@Injectable()
export class ConfigService {
  env: AppEnvDTO & EnvDTO

  constructor() {
    this.env = {
      ...getEnvConfig(AppEnvDTO),
      ...getEnvConfig(EnvDTO),
    }
  }

  getGrpcClickService() {
    return makeGrpcService<click.ClickService>('ClickService', {
      url: this.env.SERVICE_CLICK_GRPC_URL,
      package: 'tds.click',
      protoPath: join(contractsPath, 'grpc/click.proto'),
    })
  }
}
