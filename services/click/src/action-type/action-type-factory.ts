import { campaign } from '@tds/contracts/grpc'
import { ActionType } from './action-type'
import { Show404ActionType } from './show-404-action-type'
import { ShowHtmlActionType } from './show-html-action-type'
import { ShowTextActionType } from './show-text-action-type'
import { NothingActionType } from './nothing-action-type'
import { ToCampaignActionType } from './to-campaign-action-type'
import { Inject, Injectable } from '@nestjs/common'
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core'

@Injectable()
export class ActionTypeFactory {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
    private readonly moduleRef: ModuleRef,
  ) {}

  create(stream: campaign.CampaignStream): Promise<ActionType> {
    if (stream.actionType === undefined || stream.actionType === null) {
      throw new Error('actionType not set')
    }
    switch (stream.actionType) {
      case campaign.StreamActionType.SHOW404:
        return this.moduleRef.get(Show404ActionType)
      case campaign.StreamActionType.SHOW_HTML:
        return this.moduleRef.get(ShowHtmlActionType)
      case campaign.StreamActionType.SHOW_TEXT:
        return this.moduleRef.get(ShowTextActionType)
      case campaign.StreamActionType.NOTHING:
        return this.moduleRef.get(NothingActionType)
      case campaign.StreamActionType.TO_CAMPAIGN:
        const contextId = ContextIdFactory.getByRequest(this.request)
        return this.moduleRef.resolve(ToCampaignActionType, contextId)
    }
    const at: never = stream.actionType
    throw new Error('Unknown actionType ' + at)
  }
}
