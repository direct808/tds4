import { Module } from '@nestjs/common'
import { ClickService } from './click.service'
import { ForeignService } from './foreign.service'
import { ConfigModule } from '../config'

@Module({
  imports: [ConfigModule],
  providers: [ClickService, ForeignService],
  exports: [ClickService],
})
export class ClickModule {}
