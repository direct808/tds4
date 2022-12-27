import { RedirectType } from '../redirect-type'
import { click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JsRedirectType implements RedirectType {
  async handle(url: string): Promise<click.AddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<html>
<head>
  <script type="application/javascript">
    function process() {
      if (window.location !== window.parent.location) {
        top.location = "${url}";
      } else {
        window.location = "${url}";
      }
    }

    window.onerror = process;
    process();</script>
</head>
<body>
The Document has moved <a href="${url}">here</a>
</body>
</html>
      `,
    }
  }
}
