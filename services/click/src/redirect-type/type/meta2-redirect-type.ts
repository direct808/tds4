import { RedirectType } from '../redirect-type'
import { click } from '@tds/contracts/grpc'
import { sign } from 'jsonwebtoken'
import { EnvDTO } from '@tds/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Meta2RedirectType implements RedirectType {
  constructor(private readonly env: EnvDTO) {}

  async handle(url: string): Promise<click.AddClickResponse> {
    const token = sign({ url }, this.env.SECRET, {
      noTimestamp: true,
    })

    const gatewayUrl = '/gateway/' + token

    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<html>
<head>
  <meta http-equiv="REFRESH"
        content="1; URL='${url}'">
  <script
    type="application/javascript">window.location = "${gatewayUrl}";</script>
</head>
</html>`,
    }
  }
}
