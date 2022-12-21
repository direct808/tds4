import { NestFactory } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiGatewayModule)
  await app.set('etag', false)
  await app.listen(4000)
}

bootstrap()
