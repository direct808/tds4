import { click } from '@tds/contracts/grpc'
import { AddClickDTO } from '../dto'

export type ActionTypeData = {
  actionContent?: string | null
  actionCampaignId?: string | null
}

export interface ActionType {
  handle(data: ActionTypeData): Promise<click.AddClickResponse>
}
