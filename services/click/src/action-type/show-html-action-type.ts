import { ActionType } from './action-type'
import * as grpc from '@tds/contracts'

export class ShowHtmlActionType implements ActionType {
  handle(stream: grpc.campaign.CampaignStream) {
    return {
      type: grpc.click.AddClickResponse.Type.CONTENT,
      content: stream.actionContent,
    }
  }
}
