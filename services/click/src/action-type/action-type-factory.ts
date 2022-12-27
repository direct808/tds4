import { ActionType } from './action-type'
import { Show404ActionType } from './show-404-action-type'
import { ShowHtmlActionType } from './show-html-action-type'
import { ShowTextActionType } from './show-text-action-type'
import { NothingActionType } from './nothing-action-type'
import { ToCampaignActionType } from './to-campaign-action-type'
import { Inject, Injectable } from '@nestjs/common'
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core'
import { grpc } from '@tds/contracts'
import { tds } from '@tds/contracts/grpc/campaign'
import Type = tds.global.ActionType

@Injectable()
export class ActionTypeFactory {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
    private readonly moduleRef: ModuleRef,
  ) {}

  create(actionType: Type): Promise<ActionType> {
    switch (actionType) {
      case Type.SHOW404:
        return this.moduleRef.get(Show404ActionType)
      case Type.SHOW_HTML:
        return this.moduleRef.get(ShowHtmlActionType)
      case Type.SHOW_TEXT:
        return this.moduleRef.get(ShowTextActionType)
      case Type.NOTHING:
        return this.moduleRef.get(NothingActionType)
      case Type.TO_CAMPAIGN:
        const contextId = ContextIdFactory.getByRequest(this.request)
        return this.moduleRef.resolve(ToCampaignActionType, contextId)
    }
    const at: never = actionType
    throw new Error('Unknown actionType ' + at)
  }
}
