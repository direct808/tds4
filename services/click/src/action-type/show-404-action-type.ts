import { ActionType } from './action-type'
import { click } from '@tds/contracts/grpc'

export class Show404ActionType implements ActionType {
  async handle() {
    return { type: click.AddClickResponse.Type.NOT_FOUND }
  }
}
