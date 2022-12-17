import { Module } from '@nestjs/common'
import { ClickController } from './click.controller'

@Module({
  controllers: [ClickController],
})
export class ClickModule {}
