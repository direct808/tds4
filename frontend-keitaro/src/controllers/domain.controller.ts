import { Injectable } from '@nestjs/common'
import { KeitaroController } from '../modules/keitaro-controller'

@Injectable()
export class DomainController {
  @KeitaroController('GET', 'domains.listAsOptions')
  filters() {
    return []
  }
}
