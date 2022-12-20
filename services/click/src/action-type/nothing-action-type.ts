import { ActionType } from './action-type'
import * as grpc from '@tds/contracts'

export class NothingActionType implements ActionType {
  handle() {
    return { type: grpc.click.AddClickResponse.Type.NOTHING }
  }
}
