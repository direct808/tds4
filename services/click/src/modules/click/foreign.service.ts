import { affiliateNetwork, campaign, offer } from '@tds/contracts/grpc'
import { ConfigService } from '../config'
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
    args: campaign.IGetCampaignFullRequest,
  ): Promise<campaign.IGetCampaignFullResponse> {
    return firstValueFrom(this.campaignService.getCampaignFull(args))
  }

  getOfferList(
    args: offer.IGetOfferListRequest,
  ): Promise<offer.IGetOfferListResponse> {
    return firstValueFrom(this.offerService.getOfferList(args))
  }

  getAffiliateNetworkList(
    args: affiliateNetwork.IGetAffiliateNetworkListRequest,
  ): Promise<affiliateNetwork.IGetAffiliateNetworkListResponse> {
    return firstValueFrom(
      this.affiliateNetworkService.getAffiliateNetworkList(args),
    )
  }
}
