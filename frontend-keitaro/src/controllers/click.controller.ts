import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class ClickController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'clicks.logDefinition')
  getCountries() {
    return this.appService.getClicksLogDefinition()
  }
}
