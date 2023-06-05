import { KeitaroController } from '../modules/keitaro-controller'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FavoriteReportController {
  @KeitaroController('GET', 'favouriteReports.index')
  getPostbackStatuses() {
    return []
  }
}
