import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class StreamTypesController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'streamTypes.listAsOptions')
  listAsOptions() {
    return this.appService.getStreamTypesListAsOptions()
  }
}
