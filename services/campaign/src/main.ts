import { NestFactory } from '@nestjs/core';
import { CampaignsModule } from './campaigns.module';

async function bootstrap() {
  const app = await NestFactory.create(CampaignsModule);
  await app.listen(3000);
}

bootstrap();
