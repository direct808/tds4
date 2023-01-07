import { Module } from '@nestjs/common'
import { ConfigModule } from './modules/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { contractsPath } from '@tds/common'
import { QueryService } from './query.service'
import { TypeOrmConfigService } from './typeorm-config.service'
import { AppController } from './app.controller'
import { CampaignModule } from './modules/campaign'
import { CampaignResolver, CampaignStreamResolver } from './resolvers'

@Module({
  imports: [
    CampaignModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [path.join(contractsPath, 'graphql/campaign.graphql')],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [QueryService, CampaignResolver, CampaignStreamResolver],
})
export class AppModule {}
