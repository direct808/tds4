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
import { ConfigModule } from '../../config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [ConfigModule, HttpModule],
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
