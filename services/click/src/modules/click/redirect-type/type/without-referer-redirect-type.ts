import { RedirectType } from '../redirect-type'
import { click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WithoutRefererRedirectType implements RedirectType {
  async handle(url: string): Promise<click.IAddClickResponse> {
    return {
      type: click.AddClickResponse.Type.CONTENT,
      content: `<!doctype html>
<html>
<head></head>
<body>

<script>
    function go() {
       window.frames[0].document.body.innerHTML = '<form target="_parent" method="post" action="${url}"></form>';
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
