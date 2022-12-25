import { NestFactory } from '@nestjs/core'
import { OfferModule } from './offer.module'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { contractsPath, EnvDTO } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(OfferModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const env = app.get(EnvDTO)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4044',
      package: 'tds.offer',
      protoPath: join(contractsPath, 'grpc/offer.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.SERVICE_OFFER_PORT)
}

bootstrap()
