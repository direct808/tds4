import { NestFactory } from '@nestjs/core'
import { CampaignModule } from './campaign.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(CampaignModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4015',
      package: 'tds.campaign',
      protoPath: resolve(
        __dirname,
        '../../../../contracts/grpc/campaign.proto',
      ),
    },
  })

  await app.startAllMicroservices()
  await app.listen(4005)
}

dotenv.config({
  path: resolve(__dirname + './../../../../.env'),
})

bootstrap()
