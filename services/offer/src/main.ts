import { NestFactory } from '@nestjs/core'
import { OfferModule } from './offer.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(OfferModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(4004)
}

bootstrap()
