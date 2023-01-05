import { RedirectType } from '../redirect-type'
import { click } from '@tds/contracts/grpc'
import axios from 'axios'
import { isURL } from 'class-validator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemoteRedirectType implements RedirectType {
  async handle(url: string): Promise<click.AddClickResponse> {
    const { data } = await axios.get<string>(url)
    const preparedUrl = data.trim()

    if (!isURL(preparedUrl, { require_protocol: true })) {
      throw new Error('Url not valid')
    }

    return {
      type: click.AddClickResponse.Type.REDIRECT,
      redirectUrl: preparedUrl,
    }
  }
}
