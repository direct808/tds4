import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JsRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<html>
<head>
  <script type="application/javascript">
    function process() {
      if (window.location !== window.parent.location) {
        top.location = "${stream.redirectUrl}";
      } else {
        window.location = "${stream.redirectUrl}";
      }
    }

    window.onerror = process;
    process();</script>
</head>
<body>
The Document has moved <a href="${stream.redirectUrl}">here</a>
</body>
</html>
      `,
    }
  }
}
