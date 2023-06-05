import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'
import { AppService } from '../app.service'

@Injectable()
export class StreamSchemaController {
  constructor(private readonly appService: AppService) {}

  @KeitaroController('GET', 'streamSchemas.listAsOptions')
  listAsOptions() {
    return this.appService.getStreamSchemasListAsOptions()
  }
}
