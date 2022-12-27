import { offer, trafficSource } from '@tds/contracts/grpc'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly trafficSourceService
  private readonly offerService

  constructor(private readonly configService: ConfigService) {
    this.trafficSourceService = this.configService.getGrpcTrafficSourceService()
    this.offerService = this.configService.getGrpcOfferService()
  }

  async getTrafficSourceList(
    args: trafficSource.GetTrafficSourceListRequest,
  ): Promise<trafficSource.TrafficSource[]> {
    const result = await firstValueFrom(
      this.trafficSourceService.getTrafficSourceList(args),
    )
    return result.result!
  }

  async getOfferList(args: offer.GetOfferListRequest): Promise<offer.Offer[]> {
    const { offers } = await firstValueFrom(
      this.offerService.getOfferList(args),
    )
    return offers!
  }
}
