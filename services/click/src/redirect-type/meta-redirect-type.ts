import { RedirectType } from './redirect-type'
import { click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MetaRedirectType implements RedirectType {
  async handle(url: string): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<html>
<head>
  <meta http-equiv="REFRESH" content="1; URL='${url}'">
  <script type="application/javascript">window.location = "${url}";</script>
</head>
</html>
      `,
    }
  }
}
