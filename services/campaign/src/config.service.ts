import { join } from 'path'
import { contractsPath, EnvDTO, makeGrpcService } from '@tds/common'
import { offer, trafficSource } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  constructor(private readonly env: EnvDTO) {}

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
