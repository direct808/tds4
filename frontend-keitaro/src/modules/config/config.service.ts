import { Injectable } from '@nestjs/common'
import { contractsPath, getEnvConfig, makeGrpcService } from '@tds/common'
import { join } from 'path'
import { trafficSource } from '@tds/contracts/grpc'
import { EnvDTO } from '@tds/common/env/env.DTO'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: join(__dirname, './../../../../../.env') })
  })
}

@Injectable()
export class ConfigService {
  env: EnvDTO

  constructor() {
    this.env = {
      ...getEnvConfig(EnvDTO),
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
}
