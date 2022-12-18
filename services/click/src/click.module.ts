import { Module } from '@nestjs/common'
import { ClickController } from './click.controller'
import { ClickService } from './click.service'
import { DatabaseModule } from '@tds/common'
import path from 'path'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'

@Module({
  imports: [
    DatabaseModule.forRoot(
      [path.join(__dirname, './entities/*.entity.{ts,js}')],
      'click',
    ),
  ],
  providers: [ClickService, ForeignService, ConfigService],
  controllers: [ClickController],
})
export class ClickModule {}
