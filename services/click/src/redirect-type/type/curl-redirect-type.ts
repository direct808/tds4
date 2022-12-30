import { click } from '@tds/contracts/grpc'
import axios from 'axios'
import { URL } from 'url'
import { Injectable } from '@nestjs/common'
import { RedirectType } from '../redirect-type'

@Injectable()
export class CurlRedirectType implements RedirectType {
  async handle(url: string): Promise<click.AddClickResponse> {
    let { data: content } = await axios.get(url)

    content = this.setBase(content, this.prepareUrl(url))

    return {
      type: click.AddClickResponse.Type.CONTENT,
      content,
    }
  }

  private setBase(content: string, url: string) {
    return content.replace('<head>', `<head><base href="${url}">`)
  }

  private prepareUrl(url: string) {
    const parsed = new URL(url)

    return `//${parsed.host}/`
  }
}
