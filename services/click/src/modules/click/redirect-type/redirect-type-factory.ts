import { ModuleRef } from '@nestjs/core'
import { Injectable } from '@nestjs/common'
import { tds } from '@tds/contracts/grpc/campaign'
import { RedirectType } from './redirect-type'
import {
  CurlRedirectType,
  FormSubmitRedirectType,
  HttpRedirectType,
  IframeRedirectType,
  JsRedirectType,
  Meta2RedirectType,
  MetaRedirectType,
  RemoteRedirectType,
  WithoutRefererRedirectType,
} from './type'
import Type = tds.global.RedirectType

@Injectable()
export class RedirectTypeFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  create(redirectType: Type): RedirectType {
    switch (redirectType) {
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

    const at: never = redirectType
    throw new Error('Unknown actionType ' + at)
  }
}
