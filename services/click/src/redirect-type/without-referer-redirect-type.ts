import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WithoutRefererRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<!doctype html>
<html>
<head></head>
<body>

<script>
    function go() {
       window.frames[0].document.body.innerHTML = '<form target="_parent" method="post" action="${stream.redirectUrl}"></form>';
        window.frames[0].document.forms[0].submit()
    }
</script>
<iframe onload="window.setTimeout('go()', 99)" src="about:blank" style="visibility:hidden"></iframe>
</body>
</html>
`,
    }
  }
}
