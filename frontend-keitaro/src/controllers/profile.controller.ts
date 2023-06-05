import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class ProfileController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'profile.show')
  show() {
    return this.appService.getProfileShow()
  }
}
