import { Module } from '@nestjs/common'
import { OfferService } from './offer.service'
import { DatabaseModule } from '@tds/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { Offer, OfferGroup } from './entities'
import { QueryService } from './query.service'
import { ForeignService } from './foreign.service'
import { ConfigService, contractsPath } from './config.service'
import { OfferResolver } from './resolvers'
import { OfferGroupService } from './offer-group.service'
import { OfferGroupLoader } from './loaders'

@Module({
  imports: [
    DatabaseModule.forRoot([Offer, OfferGroup], 'offer'),
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
})
export class OfferModule {}
