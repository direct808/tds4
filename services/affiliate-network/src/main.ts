import { NestFactory } from '@nestjs/core'
import { AffiliateNetworkModule } from './affiliate-network.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath, EnvDTO } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(AffiliateNetworkModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.init()
  const env = await app.resolve(EnvDTO)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: env.SERVICE_AFFILIATE_NETWORK_GRPC_URL,
      package: 'tds.affiliate_network',
      protoPath: join(contractsPath, 'grpc/affiliate-network.proto'),
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.SERVICE_AFFILIATE_NETWORK_PORT)
}

dotenv.config({
  path: join(__dirname, './../../../../.env'),
})

bootstrap()
