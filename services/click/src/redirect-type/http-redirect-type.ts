import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'

export class HttpRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.REDIRECT,
      redirectUrl: stream.redirectUrl,
    }
  }
}
