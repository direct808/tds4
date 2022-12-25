import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { sign } from 'jsonwebtoken'
import { EnvDTO } from '@tds/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Meta2RedirectType implements RedirectType {
  constructor(private readonly env: EnvDTO) {}

  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    const token = sign({ url: stream.redirectUrl }, this.env.SECRET, {
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
