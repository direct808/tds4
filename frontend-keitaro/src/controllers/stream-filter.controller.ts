import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class StreamFilterController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'streamFilters.filters')
  filters() {
    return this.appService.getStreamFiltersFilters()
  }
}
