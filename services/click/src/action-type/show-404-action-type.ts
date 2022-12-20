import { ActionType } from './action-type'
import { click } from '@tds/contracts/grpc'

export class Show404ActionType implements ActionType {
  handle() {
    return { type: click.AddClickResponse.Type.NOT_FOUND }
  }
}
