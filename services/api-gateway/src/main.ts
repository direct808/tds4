import { NestFactory } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { EnvDTO } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiGatewayModule)
  await app.init()
  const env = app.get(EnvDTO)
  await app.set('etag', false)
  await app.listen(env.SERVICE_API_GATEWAY_PORT)
}

bootstrap()
