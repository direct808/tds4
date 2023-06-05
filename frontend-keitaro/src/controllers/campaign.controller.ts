import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class CampaignController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'campaigns.listAsOptions')
  listAsOptions() {
    return this.appService.getCampaignsListAsOptions()
  }

  @KeitaroController('GET', 'campaigns.index')
  index() {
    return this.appService.getCampaignsIndex()
  }
}
