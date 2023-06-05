import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'node:path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './modules/config'
import { TrafficSourceService } from './traffic-source.service'
import { KeitaroControllerModule } from './modules/keitaro-controller'
import {
  CampaignController,
  ClickController,
  CollectionsController,
  DomainController,
  FavoriteReportController,
  ProfileController,
  ReportsController,
  StreamActionsController,
  StreamFilterController,
  StreamSchemaController,
  StreamTypesController,
  SystemController,
  TrafficSourceController,
  TrafficSourceTemplateController,
} from './controllers'

const keitaroControllers = [
  SystemController,
  CollectionsController,
  TrafficSourceController,
  ReportsController,
  StreamActionsController,
  StreamTypesController,
  StreamSchemaController,
  StreamFilterController,
  DomainController,
  CampaignController,
  FavoriteReportController,
  ProfileController,
  ClickController,
  TrafficSourceTemplateController,
]

@Module({
  providers: [AppService, TrafficSourceService, ...keitaroControllers],
  controllers: [AppController],
  imports: [
    ConfigModule,
    KeitaroControllerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      // serveRoot: 'assets',
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
})
export class AppModule {}
