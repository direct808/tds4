import { Module } from '@nestjs/common'
import { ClickController } from './click.controller'
import { ClickService } from './click.service'
import { DatabaseModule } from '@tds/common'
import path from 'path'

@Module({
  imports: [
    DatabaseModule.forRoot(
      [path.join(__dirname, './entities/*.entity.{ts,js}')],
      'click',
    ),
  ],
  providers: [ClickService],
  controllers: [ClickController],
})
export class ClickModule {}
