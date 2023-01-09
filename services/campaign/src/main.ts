import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath } from '@tds/common'
import { AppModule } from './app.module'
import { ConfigService } from './modules/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const configService = await app.resolve(ConfigService)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: configService.env.GRPC_URL,
      package: 'tds.campaign',
      protoPath: join(contractsPath, 'grpc/campaign.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(configService.env.APP_PORT)
}

bootstrap()
