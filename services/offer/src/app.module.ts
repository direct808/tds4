import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { contractsPath } from '@tds/common'
import { AppController } from './app.controller'
import { QueryService } from './query.service'
import { OfferModule } from './modules/offer'
import { ConfigModule } from './modules/config'
import { TypeOrmConfigService } from './typeorm-config.service'
import { OfferResolver } from './resolvers'

@Module({
  imports: [
    OfferModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [path.join(contractsPath, 'graphql/offer.graphql')],
      debug: true,
      logger: console,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [QueryService, OfferResolver],
})
export class AppModule {}
