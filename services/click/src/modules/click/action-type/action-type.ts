import { click } from '@tds/contracts/grpc'
import { ClickData } from '../click-data'

export type ActionTypeData = {
  actionContent?: string | null
  actionCampaignId?: string | null
}

export interface ActionType {
  handle(
    data: ActionTypeData,
    clickData: ClickData,
  ): Promise<click.IAddClickResponse>
}
