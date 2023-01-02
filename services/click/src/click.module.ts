import { Global, Module, Scope } from '@nestjs/common'
import { ClickController } from './click.controller'
import { ClickService } from './click.service'
import { DatabaseModule, EnvModule } from '@tds/common'
import path from 'path'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'
import { ActionTypeModule } from './action-type'
import { RedirectTypeModule } from './redirect-type'
import { ClickDataService } from './click-data.service'
import { ClickInputDTO } from './dto'
import { RequestContextHost } from '@nestjs/microservices/context/request-context-host'
import { REQUEST } from '@nestjs/core'
import { plainToInstance } from 'class-transformer'

@Global()
@Module({
  imports: [
    EnvModule,
    ActionTypeModule,
    RedirectTypeModule,
    DatabaseModule.forRoot(
      [path.join(__dirname, './entities/*.entity.{ts,js}')],
      'click',
    ),
  ],
  providers: [
    ClickService,
    ForeignService,
    ConfigService,
    ClickDataService,
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
  controllers: [ClickController],
})
export class ClickModule {}
