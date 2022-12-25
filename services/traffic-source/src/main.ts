import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { TrafficSourceModule } from './traffic-source.module'
import { join } from 'path'
import dotenv from 'dotenv'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath, EnvDTO } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(TrafficSourceModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const env = app.get(EnvDTO)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.SERVICE_TRAFFIC_SOURCE_GRPC_URL,
      package: 'tds.traffic_source',
      protoPath: join(contractsPath, 'grpc/traffic-source.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.SERVICE_TRAFFIC_SOURCE_PORT)
}

dotenv.config({ path: join(__dirname + './../../../../.env') })

bootstrap()
