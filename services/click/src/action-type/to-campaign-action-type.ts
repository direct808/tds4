import { ActionType } from './action-type'
import { grpc } from '@tds/contracts'

export class ToCampaignActionType implements ActionType {
  handle(): grpc.click.AddClickResponse {
    throw new Error('Not realize')
  }
}
