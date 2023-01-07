import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath } from '@tds/common'
import { AppModule } from './app.module'
import { ConfigService } from './modules/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.init()
  const { env } = app.get(ConfigService)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.GRPC_URL,
      package: 'tds.click',
      protoPath: join(contractsPath, 'grpc/click.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.GQL_PORT)
}

bootstrap()
