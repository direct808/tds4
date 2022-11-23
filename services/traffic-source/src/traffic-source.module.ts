import { Module } from '@nestjs/common'
import { QueryService } from './query.service'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from './config/config.module'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { TrafficSourceService } from './traffic-source.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [path.resolve(__dirname, '../traffic-source.graphql')],
      debug: true,
      // playground: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [],
  providers: [QueryService, TrafficSourceService],
})
export class TrafficSourceModule {}
