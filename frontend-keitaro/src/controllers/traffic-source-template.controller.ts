import { Injectable } from '@nestjs/common'
import { AppService } from '../app.service'
import { KeitaroController } from '../modules/keitaro-controller'

@Injectable()
export class TrafficSourceTemplateController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'trafficSourceTemplates.index')
  index() {
    return this.appService.gettrafficSourceTemplatesIndex()
  }
}
