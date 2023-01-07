import { Global, Module, Scope } from '@nestjs/common'
import { ClickService } from './click.service'
import { ForeignService } from './foreign.service'
import { ActionTypeModule } from './action-type'
import { RedirectTypeModule } from './redirect-type'
import { ClickInputDTO } from '../../dto'
import { RequestContextHost } from '@nestjs/microservices/context/request-context-host'
import { REQUEST } from '@nestjs/core'
import { plainToInstance } from 'class-transformer'
import { ClickData } from './click-data'
import { TemplateService } from './template.service'
import { ConfigModule } from '../config'

@Global()
@Module({
  imports: [ActionTypeModule, RedirectTypeModule, ConfigModule],
  providers: [
    ClickService,
    ForeignService,
    ClickData,
    TemplateService,
    {
      scope: Scope.REQUEST,
      provide: ClickInputDTO,
      useFactory(request: RequestContextHost<ClickInputDTO>) {
        return plainToInstance(ClickInputDTO, request.data)
      },
      inject: [REQUEST],
    },
  ],
  exports: [ClickService, ForeignService],
})
export class ClickModule {}
