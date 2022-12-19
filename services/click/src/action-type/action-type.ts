import * as grpc from '@tds/contracts'

export interface ActionType {
  handle(stream: grpc.campaign.CampaignStream): grpc.click.AddClickResponse
}
