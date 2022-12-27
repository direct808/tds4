import { ActionType } from './action-type'
import { Inject, Injectable } from '@nestjs/common'
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core'
import { tds } from '@tds/contracts/grpc/campaign'
import Type = tds.global.ActionType
import {
  NothingActionType,
  Show404ActionType,
  ShowHtmlActionType,
  ShowTextActionType,
  ToCampaignActionType,
} from './type'

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
