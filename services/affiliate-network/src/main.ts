import { NestFactory } from '@nestjs/core'
import { AffiliateNetworkModule } from './affiliate-network.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { resolve } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AffiliateNetworkModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(4002)
}

dotenv.config({
  path: resolve(__dirname + './../../../../.env'),
})
console.log(process.env.DB_HOST)

bootstrap()
