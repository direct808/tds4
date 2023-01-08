import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path, { join } from 'path'
import { contractsPath } from '@tds/common'
import { AppController } from './app.controller'
import { QueryService } from './query.service'
import { ConfigModule, TypeOrmConfigService } from './modules/config'
import { TrafficSourceModule } from './modules/traffic-source'
import { TrafficSourceResolver } from './resolvers'

@Module({
  imports: [
    TrafficSourceModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [join(contractsPath, 'graphql/traffic-source.graphql')],
    }),
  ],
  controllers: [AppController],
  providers: [QueryService, TrafficSourceResolver],
})
export class AppModule {}
