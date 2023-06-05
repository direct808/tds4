import { trafficSource } from '@tds/contracts/grpc'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'
import { ConfigService } from './modules/config'

@Injectable()
export class TrafficSourceService {
  private readonly trafficSource

  constructor(private readonly configService: ConfigService) {
    this.trafficSource = this.configService.getGrpcTrafficSourceService()
  }

  trafficSourceSave(
    args: trafficSource.ITrafficSourceSaveRequest,
  ): Promise<trafficSource.ITrafficSourceSaveResponse> {
    return firstValueFrom(this.trafficSource.trafficSourceSave(args))
  }
}
