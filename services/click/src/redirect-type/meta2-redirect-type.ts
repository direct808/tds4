import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { sign } from 'jsonwebtoken'

export class Meta2RedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    // todo: to env
    const token = sign({ url: stream.redirectUrl }, 'privateKey', {
      noTimestamp: true,
    })

    const url = '/gateway/' + token

    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<html>
<head>
  <meta http-equiv="REFRESH"
        content="1; URL='${url}'">
  <script
    type="application/javascript">window.location = "${url}";</script>
</head>
</html>`,
    }
  }
}
