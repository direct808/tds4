import { ActionType, ActionTypeData } from './action-type'
import { click } from '@tds/contracts/grpc'

export class ShowHtmlActionType implements ActionType {
  async handle(data: ActionTypeData) {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: data.actionContent,
    }
  }
}
