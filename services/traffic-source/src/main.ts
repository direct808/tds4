import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { TrafficSourceModule } from './traffic-source.module'
import { resolve } from 'path'
import dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(TrafficSourceModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(4003)
}

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

bootstrap()
