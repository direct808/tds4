import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MetaRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<html>
<head>
  <meta http-equiv="REFRESH" content="1; URL='${stream.redirectUrl}'">
  <script type="application/javascript">window.location = "${stream.redirectUrl}";</script>
</head>
</html>
      `,
    }
  }
}
