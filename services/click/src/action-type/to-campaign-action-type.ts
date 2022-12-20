import { ActionType } from './action-type'
import { grpc } from '@tds/contracts'

export class ToCampaignActionType implements ActionType {
  async handle(): Promise<grpc.click.AddClickResponse> {
    throw new Error('Not realize')
  }
}
