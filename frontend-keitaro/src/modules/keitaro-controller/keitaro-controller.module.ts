import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { KeitaroControllerMiddleware } from './keitaro-controller.middleware'
import { KeitaroControllerService } from './keitaro-controller.service'

// @Global()
@Module({
  providers: [KeitaroControllerService],
})
export class KeitaroControllerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(KeitaroControllerMiddleware).forRoutes('/admin')
  }
}
