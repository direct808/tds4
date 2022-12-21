import { campaign } from '@tds/contracts/grpc'
import { tds } from '@tds/contracts/grpc/campaign'
import StreamRedirectType = tds.campaign.StreamRedirectType
import { HttpRedirectType } from './http-redirect-type'
import { RedirectType } from './redirect-type'

export class RedirectTypeFactory {
  static create(stream: campaign.CampaignStream): RedirectType {
    if (typeof stream.redirectType === 'undefined') {
      throw new Error('redirectType not set')
    }
    switch (stream.redirectType) {
      case StreamRedirectType.HTTP:
        return new HttpRedirectType()
      case StreamRedirectType.META:
        throw new Error('Not realize')
      case StreamRedirectType.CURL:
        throw new Error('Not realize')
      case StreamRedirectType.FORM_SUBMIT:
        throw new Error('Not realize')
      case StreamRedirectType.META2:
        throw new Error('Not realize')
      case StreamRedirectType.JS:
        throw new Error('Not realize')
      case StreamRedirectType.IFRAME:
        throw new Error('Not realize')
      case StreamRedirectType.REMOTE:
        throw new Error('Not realize')
      case StreamRedirectType.WITHOUT_REFERER:
        throw new Error('Not realize')
    }
    const at: never = stream.redirectType
    throw new Error('Unknown actionType ' + at)
  }
}
