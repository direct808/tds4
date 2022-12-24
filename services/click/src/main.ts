import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ClickModule } from './click.module'
import { contractsPath } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(ClickModule)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4016',
      package: 'tds.click',
      protoPath: join(contractsPath, 'grpc/click.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(4006)
}

bootstrap()
