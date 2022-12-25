import { Module } from '@nestjs/common'
import { QueryService } from './query.service'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { AffiliateNetworkService } from './affiliate-network.service'
import { contractsPath, DatabaseModule, EnvModule } from '@tds/common'
import { AffiliateNetworkController } from './affiliate-network.controller'
import { AffiliateNetworkLoader } from './loaders'
import { AffiliateNetworkResolver } from './resolvers'

@Module({
  imports: [
    EnvModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [
        path.join(contractsPath, 'graphql/affiliate-network.graphql'),
      ],
    }),
    DatabaseModule.forRoot(
      [path.join(__dirname, './entities/*.entity.{ts,js}')],
      'affiliate_network',
    ),
  ],
  providers: [
    QueryService,
    AffiliateNetworkService,
    AffiliateNetworkResolver,
    AffiliateNetworkLoader,
  ],
  controllers: [AffiliateNetworkController],
})
export class AffiliateNetworkModule {}
