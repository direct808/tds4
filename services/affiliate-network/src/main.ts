import { NestFactory } from '@nestjs/core'
import { AffiliateNetworkModule } from './affiliate-network.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { join } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { contractsPath } from '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(AffiliateNetworkModule)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4014',
      package: 'tds.affiliate_network',
      protoPath: join(contractsPath, 'grpc/affiliate-network.proto'),
    },
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.startAllMicroservices()
  await app.listen(4002)
}

dotenv.config({
  path: join(__dirname, './../../../../.env'),
})

bootstrap()
