import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class SystemController {
  constructor(private readonly appService: AppService) {}
  @KeitaroController('GET', 'system.timezones')
  getSystemTimezones() {
    return this.appService.getSystemTimezones()
  }

  @KeitaroController('GET', 'system.availableParameters')
  availableParameters() {
    return this.appService.getSystemAvailableParameters()
  }
}
