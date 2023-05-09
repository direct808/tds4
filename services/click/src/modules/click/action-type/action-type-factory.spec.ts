import { ActionTypeFactory } from './action-type-factory'
import { tds } from '@tds/contracts/grpc/compiled'
import { Test } from '@nestjs/testing'
import { ModuleRef } from '@nestjs/core'
import {
  NothingActionType,
  Show404ActionType,
  ShowHtmlActionType,
  ShowTextActionType,
  ToCampaignActionType,
} from './type'
import { ClickService } from '../click.service'
import { ForeignService } from '../foreign.service'
import ActionType = tds.global.ActionType

describe('action-type-factory', () => {
  let factory: ActionTypeFactory

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NothingActionType,
        Show404ActionType,
        ShowHtmlActionType,
        ShowTextActionType,
        ToCampaignActionType,
      ],
    })
      .useMocker((token) => {
        switch (token) {
          case ForeignService:
          case ClickService:
            return {}
        }
      })
      .compile()

    factory = new ActionTypeFactory(module.get(ModuleRef))
  })

  it('ShowHtmlActionType', async () => {
    const result = factory.create(ActionType.SHOW_HTML)
    expect(result).toBeInstanceOf(ShowHtmlActionType)
  })

  it('Show404ActionType', async () => {
    const result = factory.create(ActionType.SHOW404)
    expect(result).toBeInstanceOf(Show404ActionType)
  })

  it('NothingActionType', async () => {
    const result = factory.create(ActionType.NOTHING)
    expect(result).toBeInstanceOf(NothingActionType)
  })

  it('ShowTextActionType', async () => {
    const result = factory.create(ActionType.SHOW_TEXT)
    expect(result).toBeInstanceOf(ShowTextActionType)
  })

  it('ToCampaignActionType', async () => {
    const result = await factory.create(ActionType.TO_CAMPAIGN)
    expect(result).toBeInstanceOf(ToCampaignActionType)
  })

  it('Unknown action type', async () => {
    const t = () => {
      return factory.create('test action type' as any)
    }

    expect(t).toThrow()
  })
})
