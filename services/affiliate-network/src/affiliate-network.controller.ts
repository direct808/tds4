import { GrpcMethod } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { AffiliateNetworkService } from './affiliate-network.service'

@Controller()
export class AffiliateNetworkController {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @GrpcMethod('AffiliateNetworkService')
  async getAffiliateNetworkList() {
    const [result, totalCount] = await this.affiliateNetworkService.find()
    return { result, totalCount }
  }
}
