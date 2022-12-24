import { NestFactory } from '@nestjs/core'
import { CampaignModule } from './campaign.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(CampaignModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4015',
      package: 'tds.campaign',
      protoPath: join(contractsPath, 'grpc/campaign.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(4005)
}

bootstrap()
