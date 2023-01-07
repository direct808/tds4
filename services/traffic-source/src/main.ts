import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath } from '@tds/common'
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
      package: 'tds.traffic_source',
      protoPath: join(contractsPath, 'grpc/traffic-source.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.GQL_PORT)
}

bootstrap()
