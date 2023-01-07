import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath } from '@tds/common'
import { ConfigService } from './modules/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const { env } = await app.resolve(ConfigService)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.GRPC_URL,
      package: 'tds.affiliate_network',
      protoPath: join(contractsPath, 'grpc/affiliate-network.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.GQL_PORT)
}

bootstrap()
