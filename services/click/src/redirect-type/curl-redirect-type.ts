import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import axios from 'axios'
import { URL } from 'url'

export class CurlRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    let { data: content } = await axios.get(stream.redirectUrl!)

    content = this.setBase(content, this.prepareUrl(stream.redirectUrl!))

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
