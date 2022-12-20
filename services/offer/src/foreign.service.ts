import { affiliateNetwork } from '@tds/contracts/grpc'
import { ConfigService } from './config.service'
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
    args: affiliateNetwork.GetAffiliateNetworkListRequest,
  ): Promise<affiliateNetwork.AffiliateNetwork[]> {
    const result = await firstValueFrom(
      this.affiliateNetworkService.getAffiliateNetworkList(args),
    )
    return result.result!
  }
}
