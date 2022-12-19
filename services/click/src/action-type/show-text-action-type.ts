import { ActionType } from './action-type'
import * as grpc from '@tds/contracts'

export class ShowTextActionType implements ActionType {
  handle(): grpc.click.AddClickResponse {
    throw new Error('Not realize')
  }
}
