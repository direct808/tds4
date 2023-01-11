import { click } from '@tds/contracts/grpc'

export type ActionTypeData = {
  actionContent?: string | null
  actionCampaignId?: string | null
}

export interface ActionType {
  handle(data: ActionTypeData): Promise<click.IAddClickResponse>
}
