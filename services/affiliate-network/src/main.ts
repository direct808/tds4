import { NestFactory } from '@nestjs/core'
import { AffiliateNetworkModule } from './affiliate-network.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AffiliateNetworkModule)

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4014',
      package: 'tds.affiliate_network',
      protoPath: resolve(
        __dirname,
        '../../../../contracts/grpc/affiliate-network.proto',
      ),
    },
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.startAllMicroservices()
  await app.listen(4002)
}

dotenv.config({
  path: resolve(__dirname + './../../../../.env'),
})
console.log(process.env.DB_HOST)

bootstrap()
