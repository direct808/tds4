import { Module } from '@nestjs/common'
import { AffiliateNetworkModule } from './modules/affiliate-network'
import { ConfigModule } from './modules/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './typeorm-config.service'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { contractsPath } from '@tds/common'
import { AppController } from './app.controller'
import { QueryService } from './query.service'
import { AffiliateNetworkResolver } from './resolvers'

@Module({
  imports: [
    AffiliateNetworkModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [
        path.join(contractsPath, 'graphql/affiliate-network.graphql'),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [QueryService, AffiliateNetworkResolver],
})
export class AppModule {}
