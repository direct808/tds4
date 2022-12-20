import { Module } from '@nestjs/common'
import { ActionTypeFactory } from './action-type-factory'
import { NothingActionType } from './nothing-action-type'
import { Show404ActionType } from './show-404-action-type'
import { ShowHtmlActionType } from './show-html-action-type'
import { ShowTextActionType } from './show-text-action-type'
import { ToCampaignActionType } from './to-campaign-action-type'

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
