import { Logger, Module } from '@nestjs/common'
import { OfferService } from './offer.service'
import { DatabaseModule } from '@tds/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { Offer } from './entities'
import { QueryService } from './query.service'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'

@Module({
  imports: [
    DatabaseModule.forRoot([Offer], 'offer'),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [path.resolve(__dirname, '../offer.graphql')],
      debug: true,
      logger: console,
    }),
  ],
  providers: [ConfigService, OfferService, QueryService, ForeignService],
})
export class OfferModule {}
