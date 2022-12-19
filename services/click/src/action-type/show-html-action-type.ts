import { ActionType } from './action-type'
import * as grpc from '@tds/contracts'

export class ShowHtmlActionType implements ActionType {
  handle(stream: grpc.campaign.CampaignStream) {
    return {
      type: grpc.click.ResponseType.CONTENT,
      content: stream.actionContent,
    }
  }
}
