import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const result = await app.get(UserService).add({
    login: 'sdfsdf',
    password: 'sdfsdf',
    name: 'sdfsdf',
  });
}

bootstrap();
