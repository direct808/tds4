import { NestFactory } from '@nestjs/core'
import { OfferModule } from './offer.module'
import dotenv from 'dotenv'
import { resolve } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(OfferModule)
  await app.listen(4004)
}

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

bootstrap()
