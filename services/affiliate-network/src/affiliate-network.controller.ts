import { GrpcMethod } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { AffiliateNetworkService } from './affiliate-network.service'
import { affiliateNetwork } from '@tds/contracts'

@Controller()
export class AffiliateNetworkController {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @GrpcMethod('AffiliateNetworkService')
  async getAffiliateNetworkList(
    // todo: need dto
    // args: affiliateNetwork.IGetAffiliateNetworkListRequest,
    args: any,
  ): Promise<affiliateNetwork.IGetAffiliateNetworkListResponse> {
    const [result, totalCount] =
      await this.affiliateNetworkService.findAndCount(args)
    return { result, totalCount }
  }
}
