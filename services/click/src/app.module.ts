import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from './modules/config'
import { TypeOrmConfigService } from './typeorm-config.service'
import { ClickModule } from './modules/click'

@Module({
  imports: [
    ClickModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
