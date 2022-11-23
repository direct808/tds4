import { NestFactory } from '@nestjs/core'

import { ValidationPipe } from '@nestjs/common'
import { TrafficSourceModule } from './traffic-source.module'

async function bootstrap() {
  const app = await NestFactory.create(TrafficSourceModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(4003)
}

bootstrap()
