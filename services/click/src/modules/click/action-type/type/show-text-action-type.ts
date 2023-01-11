import { ActionType, ActionTypeData } from '../action-type'
import { click } from '@tds/contracts/grpc'

export class ShowTextActionType implements ActionType {
  async handle(data: ActionTypeData): Promise<click.IAddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: this.#escape(data.actionContent ?? ''),
    }
  }

  #escape(unsafe: string) {
    return unsafe
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;')
  }
}
