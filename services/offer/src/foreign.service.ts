import { affiliateNetwork } from '@tds/contracts'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly affiliateNetworkService =
    this.configService.getGrpcAffiliateNetworkService()

  constructor(private readonly configService: ConfigService) {}

  async getAffiliateNetworkList(
    args: affiliateNetwork.IGetAffiliateNetworkListRequest,
  ): Promise<affiliateNetwork.IAffiliateNetwork[]> {
    const result = await firstValueFrom(
      this.affiliateNetworkService.getAffiliateNetworkList(args),
    )
    return result.result
  }
}
