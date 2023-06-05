import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class StreamActionsController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'streamActions.index')
  index() {
    return this.appService.getStreamActionsIndex()
  }
}
