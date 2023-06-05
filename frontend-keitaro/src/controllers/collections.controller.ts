import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class CollectionsController {
  constructor(private readonly appService: AppService) {}
  @KeitaroController('GET', 'collections.countries')
  getCountries() {
    return this.appService.getCollectionsCountries()
  }

  @KeitaroController('GET', 'collections.deviceTypes')
  getDeviceTypes() {
    return this.appService.getCollectionsDeviceTypes()
  }

  @KeitaroController('GET', 'collections.connectionTypes')
  getConnectionTypes() {
    return this.appService.getCollectionsConnectionTypes()
  }

  @KeitaroController('GET', 'collections.languages')
  getLanguages() {
    return this.appService.getCollectionsLanguages()
  }

  @KeitaroController('GET', 'collections.operators')
  getOperators() {
    return this.appService.getCollectionsOperators()
  }
}
