import * as grpc from '@tds/contracts'
import { ActionType } from './action-type'
import { Show404ActionType } from './show-404-action-type'
import { ShowHtmlActionType } from './show-html-action-type'
import { ShowTextActionType } from './show-text-action-type'
import { NothingActionType } from './nothing-action-type'
import { ToCampaignActionType } from './to-campaign-action-type'

export class ActionTypeFactory {
  static create(stream: grpc.campaign.CampaignStream): ActionType {
    if (typeof stream.actionType === 'undefined') {
      throw new Error('actionType not set')
    }
    switch (stream.actionType) {
      case grpc.campaign.StreamActionType.SHOW404:
        return new Show404ActionType()
      case grpc.campaign.StreamActionType.SHOW_HTML:
        return new ShowHtmlActionType()
      case grpc.campaign.StreamActionType.SHOW_TEXT:
        return new ShowTextActionType()
      case grpc.campaign.StreamActionType.NOTHING:
        return new NothingActionType()
      case grpc.campaign.StreamActionType.TO_CAMPAIGN:
        return new ToCampaignActionType()
    }
    const at: never = stream.actionType
    throw new Error('Unknown actionType ' + at)
  }
}
