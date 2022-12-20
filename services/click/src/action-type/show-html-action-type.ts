import { ActionType } from './action-type'
import { campaign, click } from '@tds/contracts/grpc'

export class ShowHtmlActionType implements ActionType {
  async handle(stream: campaign.CampaignStream) {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: stream.actionContent,
    }
  }
}
