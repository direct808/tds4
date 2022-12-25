import { join } from 'path'
import { contractsPath, EnvDTO, makeGrpcService } from '@tds/common'
import { affiliateNetwork } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  constructor(private readonly env: EnvDTO) {}

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
