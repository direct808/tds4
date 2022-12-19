import { ActionType } from './action-type'
import * as grpc from '@tds/contracts'

export class Show404ActionType implements ActionType {
  handle() {
    return { type: grpc.click.ResponseType.NOT_FOUND }
  }
}
