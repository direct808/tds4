import { campaign, click } from '@tds/contracts/grpc'

export interface RedirectType {
  handle(stream: campaign.CampaignStream): Promise<click.AddClickResponse>
}
