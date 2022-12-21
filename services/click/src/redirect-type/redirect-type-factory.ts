import { campaign } from '@tds/contracts/grpc'
import { tds } from '@tds/contracts/grpc/campaign'
import { HttpRedirectType } from './http-redirect-type'
import { RedirectType } from './redirect-type'
import { MetaRedirectType } from './meta-redirect-type'
import Type = tds.campaign.StreamRedirectType
import { JsRedirectType } from './js-redirect-type'
import { FormSubmitRedirectType } from './form-submit-redirect-type'
import { IframeRedirectType } from './iframe-redirect-type'
import { WithoutRefererRedirectType } from './without-referer-redirect-type'

export class RedirectTypeFactory {
  static create(stream: campaign.CampaignStream): RedirectType {
    if (typeof stream.redirectType === 'undefined') {
      throw new Error('redirectType not set')
    }
    switch (stream.redirectType) {
      case Type.HTTP:
        return new HttpRedirectType()
      case Type.META:
        return new MetaRedirectType()
      case Type.CURL:
        throw new Error('Not realize')
      case Type.FORM_SUBMIT:
        return new FormSubmitRedirectType()
      case Type.META2:
        throw new Error('Not realize')
      case Type.JS:
        return new JsRedirectType()
      case Type.IFRAME:
        return new IframeRedirectType()
      case Type.REMOTE:
        throw new Error('Not realize')
      case Type.WITHOUT_REFERER:
        return new WithoutRefererRedirectType()
    }
    const at: never = stream.redirectType
    throw new Error('Unknown actionType ' + at)
  }
}
