import { campaign } from '@tds/contracts/grpc'
import { HttpRedirectType } from './http-redirect-type'
import { RedirectType } from './redirect-type'
import { MetaRedirectType } from './meta-redirect-type'
import { JsRedirectType } from './js-redirect-type'
import { FormSubmitRedirectType } from './form-submit-redirect-type'
import { IframeRedirectType } from './iframe-redirect-type'
import { WithoutRefererRedirectType } from './without-referer-redirect-type'
import { RemoteRedirectType } from './remote-redirect-type'
import { CurlRedirectType } from './curl-redirect-type'
import { Meta2RedirectType } from './meta2-redirect-type'
import { ModuleRef } from '@nestjs/core'
import { Injectable } from '@nestjs/common'
import { tds } from '@tds/contracts/grpc/campaign'
import Type = tds.global.RedirectType

@Injectable()
export class RedirectTypeFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  create(stream: campaign.CampaignStream): RedirectType {
    if (stream.redirectType === undefined || stream.redirectType === null) {
      throw new Error('redirectType not set')
    }
    switch (stream.redirectType) {
      case Type.HTTP:
        return this.moduleRef.get(HttpRedirectType)
      case Type.META:
        return this.moduleRef.get(MetaRedirectType)
      case Type.CURL:
        return this.moduleRef.get(CurlRedirectType)
      case Type.FORM_SUBMIT:
        return this.moduleRef.get(FormSubmitRedirectType)
      case Type.META2:
        return this.moduleRef.get(Meta2RedirectType)
      case Type.JS:
        return this.moduleRef.get(JsRedirectType)
      case Type.IFRAME:
        return this.moduleRef.get(IframeRedirectType)
      case Type.REMOTE:
        return this.moduleRef.get(RemoteRedirectType)
      case Type.WITHOUT_REFERER:
        return this.moduleRef.get(WithoutRefererRedirectType)
    }
    const at: never = stream.redirectType
    throw new Error('Unknown actionType ' + at)
  }
}
