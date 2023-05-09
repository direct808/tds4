import { Global, Module } from '@nestjs/common'
import { ClickService } from './click.service'
import { ForeignService } from './foreign.service'
import { ActionTypeModule } from './action-type'
import { RedirectTypeModule } from './redirect-type'
import { TemplateService } from './template.service'
import { ConfigModule } from '../config'

@Global()
@Module({
  imports: [ActionTypeModule, RedirectTypeModule, ConfigModule],
  providers: [ClickService, ForeignService, TemplateService],
  exports: [ClickService, ForeignService],
})
export class ClickModule {}
