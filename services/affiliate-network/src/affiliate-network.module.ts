import { Module } from '@nestjs/common'
import { QueryService } from './query.service'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { AffiliateNetworkService } from './affiliate-network.service'
import { DatabaseModule } from '@tds/common'
import { AffiliateNetwork } from './entities'
import { AffiliateNetworkController } from './affiliate-network.controller'
import { AfResolver } from './af.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [
        path.resolve(
          __dirname,
          '../../../../contracts/graphql/affiliate-network.graphql',
        ),
      ],
    }),
    DatabaseModule.forRoot([AffiliateNetwork], 'affiliate_network'),
  ],
  providers: [QueryService, AffiliateNetworkService, AfResolver],
  controllers: [AffiliateNetworkController],
})
export class AffiliateNetworkModule {}
