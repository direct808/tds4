import { affiliateNetwork } from '@tds/contracts/grpc'
import { ConfigService } from '../config'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly affiliateNetworkService

  constructor(private readonly configService: ConfigService) {
    this.affiliateNetworkService =
      this.configService.getGrpcAffiliateNetworkService()
  }

  async getAffiliateNetworkList(
    args: affiliateNetwork.IGetAffiliateNetworkListRequest,
  ): Promise<affiliateNetwork.IAffiliateNetwork[]> {
    const result = await firstValueFrom(
      this.affiliateNetworkService.getAffiliateNetworkList(args),
    )

    return result.result!
  }
}
