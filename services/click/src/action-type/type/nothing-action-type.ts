import { ActionType } from '../action-type'
import { click } from '@tds/contracts/grpc'

export class NothingActionType implements ActionType {
  async handle() {
    return { type: click.AddClickResponse.Type.NOTHING }
  }
}
