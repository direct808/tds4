import { GrpcMethod } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { trafficSource } from '@tds/contracts'
import { TrafficSourceService } from './traffic-source.service'

@Controller()
export class TrafficSourceController {
  constructor(private readonly trafficSourceService: TrafficSourceService) {}

  @GrpcMethod('TrafficSourceService')
  async getTrafficSourceList(
    // todo: need dto
    // args: affiliateNetwork.IGetTrafficSourceListRequest,
    args: any,
  ): Promise<trafficSource.IGetTrafficSourceListResponse> {
    const result = await this.trafficSourceService.find(args)
    return { result, totalCount: 0 }
  }
}
