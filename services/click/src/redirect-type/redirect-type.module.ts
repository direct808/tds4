import { Module } from '@nestjs/common'
import { RedirectTypeFactory } from './redirect-type-factory'
import { Meta2RedirectType } from './meta2-redirect-type'
import { CurlRedirectType } from './curl-redirect-type'
import { FormSubmitRedirectType } from './form-submit-redirect-type'
import { HttpRedirectType } from './http-redirect-type'
import { IframeRedirectType } from './iframe-redirect-type'
import { JsRedirectType } from './js-redirect-type'
import { MetaRedirectType } from './meta-redirect-type'
import { RemoteRedirectType } from './remote-redirect-type'
import { WithoutRefererRedirectType } from './without-referer-redirect-type'

@Module({
  providers: [
    RedirectTypeFactory,
    CurlRedirectType,
    FormSubmitRedirectType,
    HttpRedirectType,
    IframeRedirectType,
    JsRedirectType,
    Meta2RedirectType,
    MetaRedirectType,
    RemoteRedirectType,
    WithoutRefererRedirectType,
  ],
  exports: [RedirectTypeFactory],
})
export class RedirectTypeModule {}
