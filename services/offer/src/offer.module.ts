import { Module } from '@nestjs/common'
import { OfferService } from './offer.service'
import { DatabaseModule } from '@tds/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { QueryService } from './query.service'
import { ForeignService } from './foreign.service'
import { ConfigService, contractsPath } from './config.service'
import { OfferResolver } from './resolvers'
import { OfferGroupService } from './offer-group.service'
import { OfferGroupLoader } from './loaders'
import { OfferController } from './offer.controller'

@Module({
  imports: [
    DatabaseModule.forRoot(
      [path.join(__dirname, './entities/*.entity.{ts,js}')],
      'offer',
    ),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [path.resolve(contractsPath, 'graphql/offer.graphql')],
      debug: true,
      logger: console,
    }),
  ],
  providers: [
    ConfigService,
    OfferService,
    OfferGroupService,
    QueryService,
    ForeignService,
    OfferResolver,
    OfferGroupLoader,
  ],
  controllers: [OfferController],
})
export class OfferModule {}
