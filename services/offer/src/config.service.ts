import { join } from 'path'
import { contractsPath, makeGrpcService } from '@tds/common'
import { affiliateNetwork } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname + './../../../../.env') })

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
