import { Module } from '@nestjs/common'
import { ActionTypeFactory } from './action-type-factory'
import {
  NothingActionType,
  Show404ActionType,
  ShowHtmlActionType,
  ShowTextActionType,
  ToCampaignActionType,
} from './type'

@Module({
  exports: [ActionTypeFactory],
  providers: [
    ActionTypeFactory,
    NothingActionType,
    Show404ActionType,
    ShowHtmlActionType,
    ShowTextActionType,
    ToCampaignActionType,
  ],
})
export class ActionTypeModule {}
