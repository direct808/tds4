import { Module } from '@nestjs/common'
import { TrafficSourceService } from './traffic-source.service'
import { TrafficSourceLoader } from './loaders'

@Module({
  imports: [],
  providers: [TrafficSourceService, TrafficSourceLoader],
  exports: [TrafficSourceService, TrafficSourceLoader],
})
export class TrafficSourceModule {}
