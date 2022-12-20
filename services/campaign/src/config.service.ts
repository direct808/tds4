import { join, resolve } from 'path'
import { makeGrpcService } from '@tds/common'
import { trafficSource } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

export const contractsPath = join(__dirname, '../../../../contracts')

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  getGrpcTrafficSourceService() {
    return makeGrpcService<trafficSource.TrafficSourceService>(
      'TrafficSourceService',
      {
        url: 'localhost:4013',
        package: 'tds.traffic_source',
        protoPath: join(contractsPath, 'grpc/traffic-source.proto'),
      },
    )
  }
}
