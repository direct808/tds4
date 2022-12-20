import { campaign, click } from '@tds/contracts/grpc'

export interface ActionType {
  handle(stream: campaign.CampaignStream): Promise<click.AddClickResponse>
}
