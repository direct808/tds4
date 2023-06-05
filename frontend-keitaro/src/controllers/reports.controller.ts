import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class ReportsController {
  constructor(private readonly appService: AppService) {}
  @KeitaroController('GET', 'reports.definition')
  getDefinition() {
    return this.appService.getReportsDefinition()
  }

  @KeitaroController('POST', 'reports.build')
  build() {
    return this.appService.postReportsBuild()
  }

  @KeitaroController('POST', 'reports.summary')
  summary() {
    return this.appService.postReportsSummary()
  }
}
