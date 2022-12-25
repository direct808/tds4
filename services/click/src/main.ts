import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ClickModule } from './click.module'
import { contractsPath, EnvDTO } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(ClickModule)
  await app.init()
  const env = app.get(EnvDTO)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.SERVICE_CLICK_GRPC_URL,
      package: 'tds.click',
      protoPath: join(contractsPath, 'grpc/click.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.SERVICE_CLICK_PORT)
}

bootstrap()
