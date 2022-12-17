import { NestFactory } from '@nestjs/core'
import { CampaignModule } from './campaign.module'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { resolve } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(CampaignModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.startAllMicroservices()
  await app.listen(4005)
}

dotenv.config({
  path: resolve(__dirname + './../../../../.env'),
})

bootstrap()
