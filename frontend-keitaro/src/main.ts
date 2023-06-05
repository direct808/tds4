import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
//todo для корректной структуры в dist
import '@tds/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()

  app.use

  await app.listen(1234)
}

bootstrap()
