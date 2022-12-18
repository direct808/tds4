import { trafficSource } from '@tds/contracts'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly trafficSourceService =
    this.configService.getGrpcTrafficSourceService()

  constructor(private readonly configService: ConfigService) {}

  async getTrafficSourceList(
    args: trafficSource.GetTrafficSourceListRequest,
  ): Promise<trafficSource.TrafficSource[]> {
    const result = await firstValueFrom(
      this.trafficSourceService.getTrafficSourceList(args),
    )
    return result.result!
  }
}
