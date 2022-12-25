import { Global, Module } from '@nestjs/common'
import { ClickController } from './click.controller'
import { ClickService } from './click.service'
import { DatabaseModule, EnvModule } from '@tds/common'
import path from 'path'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'
import { ActionTypeModule } from './action-type'
import { RedirectTypeModule } from './redirect-type'

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
  providers: [ClickService, ForeignService, ConfigService],
  exports: [ClickService, ForeignService],
  controllers: [ClickController],
})
export class ClickModule {}
