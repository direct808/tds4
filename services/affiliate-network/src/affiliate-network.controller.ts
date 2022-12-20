import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { AffiliateNetworkService } from './affiliate-network.service'
import { affiliateNetwork } from '@tds/contracts/grpc'
import { GrpcValidationPipe } from '@tds/common'
import { GetAffiliateNetworkListDTO } from './dto'

@Controller()
@UsePipes(GrpcValidationPipe)
export class AffiliateNetworkController {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @GrpcMethod('AffiliateNetworkService')
  async getAffiliateNetworkList(
    args: GetAffiliateNetworkListDTO,
  ): Promise<affiliateNetwork.GetAffiliateNetworkListResponse> {
    console.log(args)
    const [result, totalCount] =
      await this.affiliateNetworkService.findAndCount(args)
    return { result, totalCount }
  }
}
