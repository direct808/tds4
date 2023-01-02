import { affiliateNetwork, campaign, offer } from '@tds/contracts/grpc'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly campaignService
  private readonly offerService
  private readonly affiliateNetworkService

  constructor(private readonly configService: ConfigService) {
    this.campaignService = this.configService.getGrpcCampaignService()
    this.offerService = this.configService.getGrpcOfferService()
    this.affiliateNetworkService =
      this.configService.getGrpcAffiliateNetworkService()
  }

  getCampaignFull(
    args: campaign.GetCampaignFullRequest,
  ): Promise<campaign.GetCampaignFullResponse> {
    return firstValueFrom(this.campaignService.getCampaignFull(args))
  }

  getOfferList(
    args: offer.GetOfferListRequest,
  ): Promise<offer.GetOfferListResponse> {
    return firstValueFrom(this.offerService.getOfferList(args))
  }

  getAffiliateNetworkList(
    args: affiliateNetwork.GetAffiliateNetworkListRequest,
  ): Promise<affiliateNetwork.GetAffiliateNetworkListResponse> {
    return firstValueFrom(
      this.affiliateNetworkService.getAffiliateNetworkList(args),
    )
  }
}
