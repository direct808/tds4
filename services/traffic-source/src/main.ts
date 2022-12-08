import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { TrafficSourceModule } from './traffic-source.module'
import { resolve } from 'path'
import dotenv from 'dotenv'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(TrafficSourceModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4013',
      package: 'tds.traffic_source',
      protoPath: resolve(
        __dirname,
        '../../../../contracts/grpc/traffic-source.proto',
      ),
    },
  })

  await app.startAllMicroservices()
  await app.listen(4003)
}

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

bootstrap()
