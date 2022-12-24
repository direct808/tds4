import { NestFactory } from '@nestjs/core'
import { OfferModule } from './offer.module'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { resolve } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(OfferModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4044',
      package: 'tds.offer',
      protoPath: resolve(__dirname, '../../../../contracts/grpc/offer.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(4004)
}

bootstrap()
