import { join } from 'path'
import {
  contractsPath,
  DatabaseEnvDTO,
  defaultDatabaseConfig,
  getEnvConfig,
  makeGrpcService,
} from '@tds/common'
import { affiliateNetwork } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import { AppEnvDTO } from './app-env.DTO'
import { EnvDTO } from '@tds/common/env/env.DTO'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: join(__dirname, './../../../../../../.env') })
    dotenv.config({ path: join(__dirname, './../../../.env') })
  })
}

@Injectable()
export class ConfigService {
  env: AppEnvDTO & DatabaseEnvDTO & EnvDTO

  constructor() {
    this.env = {
      ...getEnvConfig(AppEnvDTO),
      ...getEnvConfig(DatabaseEnvDTO),
      ...getEnvConfig(EnvDTO),
    }
  }

  get typeOrmConfig(): ReturnType<typeof defaultDatabaseConfig> {
    return {
      ...defaultDatabaseConfig({
        entities: [join(__dirname, '../../entities/*.entity.{ts,js}')],
        schema: 'offer',
        dbEnv: this.env,
      }),
    }
  }

  getGrpcAffiliateNetworkService() {
    return makeGrpcService<affiliateNetwork.AffiliateNetworkService>(
      'AffiliateNetworkService',
      {
        url: this.env.SERVICE_AFFILIATE_NETWORK_GRPC_URL,
        package: 'tds.affiliate_network',
        protoPath: join(contractsPath, 'grpc/affiliate-network.proto'),
      },
    )
  }
}
