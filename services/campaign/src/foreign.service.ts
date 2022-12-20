import { trafficSource } from '@tds/contracts/grpc'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly trafficSourceService

  constructor(private readonly configService: ConfigService) {
    this.trafficSourceService = this.configService.getGrpcTrafficSourceService()
  }

  async getTrafficSourceList(
    args: trafficSource.GetTrafficSourceListRequest,
  ): Promise<trafficSource.TrafficSource[]> {
    const result = await firstValueFrom(
      this.trafficSourceService.getTrafficSourceList(args),
    )
    return result.result!
  }
}
