import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FormSubmitRedirectType implements RedirectType {
  async handle(url: string): Promise<click.AddClickResponse> {
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
<form action="${url}" method="POST"></form>
</body>
</html>`,
    }
  }
}
