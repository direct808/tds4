import { ActionType } from './action-type'
import { campaign, click } from '@tds/contracts/grpc'

export class ShowTextActionType implements ActionType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: this.#escape(stream.actionContent!),
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
