import { NestFactory } from '@nestjs/core'
import { CampaignModule } from './campaign.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath, EnvDTO } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(CampaignModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const env = await app.resolve(EnvDTO)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.SERVICE_CAMPAIGN_GRPC_URL,
      package: 'tds.campaign',
      protoPath: join(contractsPath, 'grpc/campaign.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.SERVICE_CAMPAIGN_PORT)
}

bootstrap()
