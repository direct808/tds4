import { NestFactory } from '@nestjs/core';
import { AffiliateNetworkModule } from './affiliate-network.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AffiliateNetworkModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4002);
}

bootstrap();
