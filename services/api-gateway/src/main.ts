import { NestFactory } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from './modules/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiGatewayModule)
  app.enableShutdownHooks()
  await app.init()
  const { env } = app.get(ConfigService)
  await app.set('etag', false)
  await app.listen(env.APP_PORT)
}

bootstrap()
