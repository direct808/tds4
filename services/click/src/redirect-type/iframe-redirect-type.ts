import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'

export class IframeRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<!doctype html>
<html>
<style type="text/css">
    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    iframe {
        width: 100%;
        height: 100%;
        min-height: 10000px;
        border: 0;
    }
</style>
<body>
<iframe src="${stream.redirectUrl}"></iframe>
</body>
</html>`,
    }
  }
}
