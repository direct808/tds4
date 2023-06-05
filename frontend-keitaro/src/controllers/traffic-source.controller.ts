import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { TrafficSourceService } from '../traffic-source.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TrafficSourceController {
  constructor(
    private readonly appService: AppService,
    private readonly trafficSourceService: TrafficSourceService,
  ) {}

  @KeitaroController('GET', 'trafficSources.postbackStatuses')
  getPostbackStatuses() {
    return this.appService.getTrafficSourcesPostbackStatuses()
  }

  @KeitaroController('GET', 'trafficSources.gridDefinition')
  getGridDefinition() {
    return this.appService.getTrafficSourcesGridDefinition()
  }

  @KeitaroController('POST', 'trafficSources.withStats')
  getWithStats() {
    return this.appService.getTrafficSourcesWithStats()
  }

  @KeitaroController('POST', 'trafficSources.create')
  async create(payload: any) {
    const { result } = await this.trafficSourceService.trafficSourceSave(
      camelcaseKeys({
        ...payload,
        parameters: JSON.stringify(payload.parameters),
      }),
    )
    console.log(result)

    return snakecaseKeys(result!)
  }
}
