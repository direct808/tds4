import { Module } from '@nestjs/common'
import { RedirectTypeFactory } from './redirect-type-factory'
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
