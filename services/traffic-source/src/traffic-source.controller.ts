import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { trafficSource } from '@tds/contracts'
import { TrafficSourceService } from './traffic-source.service'
import { GrpcValidationPipe } from '@tds/common'
import { GetTrafficSourceListDTO } from './dto'

@Controller()
@UsePipes(GrpcValidationPipe)
export class TrafficSourceController {
  constructor(private readonly trafficSourceService: TrafficSourceService) {}

  @GrpcMethod('TrafficSourceService')
  async getTrafficSourceList(
    args: GetTrafficSourceListDTO,
  ): Promise<trafficSource.GetTrafficSourceListResponse> {
    const result = await this.trafficSourceService.find(args)
    return { result, totalCount: 0 }
  }
}
