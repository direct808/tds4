import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { AffiliateNetworkService } from './modules/affiliate-network'
import { affiliateNetwork } from '@tds/contracts/grpc'
import { GrpcValidationPipe } from '@tds/common'
import { GetAffiliateNetworkListDTO } from './dto'

@Controller()
@UsePipes(GrpcValidationPipe)
// implements Record<keyof affiliateNetwork.AffiliateNetworkService, unknown>
export class AppController {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @GrpcMethod('AffiliateNetworkService')
  async getAffiliateNetworkList(
    args: GetAffiliateNetworkListDTO,
  ): Promise<affiliateNetwork.IGetAffiliateNetworkListResponse> {
    console.log(args)
    const [result, totalCount] =
      await this.affiliateNetworkService.findAndCount(args)

    return { result, totalCount }
  }
}
