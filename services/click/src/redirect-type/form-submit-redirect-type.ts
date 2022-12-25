import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FormSubmitRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<!doctype html>
<head>
  <script>window.onload = function() {
    setTimeout(function() {
      document.forms[0].submit();
    }, 0);
  };</script>
</head>
<body>
<form action="${stream.redirectUrl}" method="POST"></form>
</body>
</html>`,
    }
  }
}
