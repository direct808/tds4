import { ActionType } from './action-type'
import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { tds } from '@tds/contracts/grpc/compiled'
import {
  NothingActionType,
  Show404ActionType,
  ShowHtmlActionType,
  ShowTextActionType,
  ToCampaignActionType,
} from './type'
import Type = tds.global.ActionType

@Injectable()
export class ActionTypeFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

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
        return this.moduleRef.get(ToCampaignActionType)
    }

    const at: never = actionType
    throw new Error(`Unknown actionType \`${at}\``)
  }
}
