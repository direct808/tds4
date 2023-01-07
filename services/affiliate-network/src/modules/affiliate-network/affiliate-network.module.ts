import { Module } from '@nestjs/common'
import { AffiliateNetworkService } from './affiliate-network.service'
import { AffiliateNetworkLoader } from './loaders'

@Module({
  providers: [AffiliateNetworkService, AffiliateNetworkLoader],
  exports: [AffiliateNetworkService, AffiliateNetworkLoader],
})
export class AffiliateNetworkModule {}
