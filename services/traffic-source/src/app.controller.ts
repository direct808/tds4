import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { trafficSource } from '@tds/contracts/grpc'
import { TrafficSourceService } from './modules/traffic-source'
import { GrpcValidationPipe } from '@tds/common'
import { GetTrafficSourceListDTO } from './dto'
import { TrafficSourceSaveDTO } from './dto/grpc'

@Controller()
@UsePipes(GrpcValidationPipe)
// implements Record<keyof trafficSource.ITrafficSourceService, unknown>
export class AppController {
  constructor(private readonly trafficSourceService: TrafficSourceService) {}

  @GrpcMethod('TrafficSourceService')
  async getTrafficSourceList(
    args: GetTrafficSourceListDTO,
  ): Promise<trafficSource.IGetTrafficSourceListResponse> {
    const result = await this.trafficSourceService.find(args)

    return { result, totalCount: 0 }
  }

  @GrpcMethod('TrafficSourceService')
  async trafficSourceSave(
    args: TrafficSourceSaveDTO,
  ): // args: GetTrafficSourceListDTO,
  Promise<trafficSource.ITrafficSourceSaveResponse> {
    const result = await this.trafficSourceService.save(args)

    console.log(typeof result.createdAt, result.createdAt)

    return { result }
  }
}
