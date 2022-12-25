import { RedirectType } from './redirect-type'
import { campaign, click } from '@tds/contracts/grpc'
import axios from 'axios'
import { isURL } from 'class-validator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemoteRedirectType implements RedirectType {
  async handle(
    stream: campaign.CampaignStream,
  ): Promise<click.AddClickResponse> {
    const { data } = await axios.get(stream.redirectUrl!)
    const url = data.trim()

    if (!isURL(url, { require_protocol: true })) {
      throw new Error('Url not valid')
    }

    console.log('Remote redirect', url)
    return {
      type: click.AddClickResponse.Type.REDIRECT,
      redirectUrl: url,
    }
  }
}
