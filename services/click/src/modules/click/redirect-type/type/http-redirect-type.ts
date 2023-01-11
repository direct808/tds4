import { RedirectType } from '../redirect-type'
import { click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HttpRedirectType implements RedirectType {
  async handle(url: string): Promise<click.IAddClickResponse> {
    return {
      type: click.AddClickResponse.Type.REDIRECT,
      redirectUrl: url,
    }
  }
}
