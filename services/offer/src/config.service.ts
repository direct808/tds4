import { join, resolve } from 'path'
import { makeGrpcService } from '@tds/common'
import { affiliateNetwork } from '@tds/contracts'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

export const contractsPath = join(__dirname, '../../../../contracts')

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  getGrpcAffiliateNetworkService() {
    return makeGrpcService<affiliateNetwork.AffiliateNetworkService>(
      'AffiliateNetworkService',
      {
        url: 'localhost:4014',
        package: 'tds.affiliate_network',
        protoPath: join(contractsPath, 'grpc/affiliate-network.proto'),
      },
    )
  }
}
