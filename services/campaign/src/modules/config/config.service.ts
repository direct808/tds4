import { Injectable } from '@nestjs/common'
import {
  contractsPath,
  DatabaseEnvDTO,
  defaultDatabaseConfig,
  getEnvConfig,
  makeGrpcService,
} from '@tds/common'
import { AppEnvDTO } from './app-env.DTO'
import { join } from 'path'
import { offer, trafficSource } from '@tds/contracts/grpc'
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
        schema: 'campaign',
        dbEnv: this.env,
      }),
    }
  }

  getGrpcTrafficSourceService() {
    return makeGrpcService<trafficSource.TrafficSourceService>(
      'TrafficSourceService',
      {
        url: this.env.SERVICE_TRAFFIC_SOURCE_GRPC_URL,
        package: 'tds.traffic_source',
        protoPath: join(contractsPath, 'grpc/traffic-source.proto'),
      },
    )
  }

  getGrpcOfferService() {
    return makeGrpcService<offer.OfferService>('OfferService', {
      url: this.env.SERVICE_OFFER_GRPC_URL,
      package: 'tds.offer',
      protoPath: join(contractsPath, 'grpc/offer.proto'),
    })
  }
}
