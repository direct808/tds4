import { Module } from '@nestjs/common'
import { QueryService } from './query.service'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { TrafficSourceService } from './traffic-source.service'
import { DatabaseModule } from '@tds/common/database.module'
import { TrafficSource } from './entities/traffic-source.entity'
import { TrafficSourceController } from './traffic-source.controller'
import { TrafficSourceResolver } from './resolvers'
import { TrafficSourceLoader } from './loaders'

@Module({
  imports: [
    DatabaseModule.forRoot([TrafficSource], 'traffic_source'),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [
        path.resolve(
          __dirname,
          '../../../../contracts/graphql/traffic-source.graphql',
        ),
      ],
    }),
  ],
  providers: [
    QueryService,
    TrafficSourceService,
    TrafficSourceResolver,
    TrafficSourceLoader,
  ],
  controllers: [TrafficSourceController],
})
export class TrafficSourceModule {}
