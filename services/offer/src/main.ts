import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { contractsPath } from '@tds/common'
import { AppModule } from './app.module'
import { ConfigService } from './modules/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const { env } = app.get(ConfigService)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.GRPC_URL,
      package: 'tds.offer',
      protoPath: join(contractsPath, 'grpc/offer.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.APP_PORT)
}

bootstrap()
