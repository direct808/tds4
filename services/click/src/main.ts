import { NestFactory } from '@nestjs/core'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ClickModule } from './click.module'

async function bootstrap() {
  const app = await NestFactory.create(ClickModule)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4016',
      package: 'tds.click',
      protoPath: resolve(__dirname, '../../../../contracts/grpc/click.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(4006)
}

dotenv.config({
  path: resolve(__dirname + './../../../../.env'),
})

bootstrap()
