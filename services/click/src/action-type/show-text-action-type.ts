import { ActionType } from './action-type'
import { click } from '@tds/contracts/grpc'

export class ShowTextActionType implements ActionType {
  handle(): click.AddClickResponse {
    throw new Error('Not realize')
  }
}
