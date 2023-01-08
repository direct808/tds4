import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { readFileSync } from 'fs'
import path from 'path'
import { AppController } from './app.controller'
import { ClickModule } from './modules/click'
import { ConfigModule, ConfigService } from './modules/config'
import { replaceSubgraphUrls } from './utils'

@Global()
@Module({
  imports: [
    ClickModule,
    ConfigModule,
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          server: {
            cors: true,
            playground: true,
            introspection: true,
          },
          gateway: {
            supergraphSdl: replaceSubgraphUrls(
              readFileSync(
                path.join(__dirname, '../schema.graphql'),
              ).toString(),
              config.env,
            ),
          },
        }
      },
    }),
  ],
  controllers: [AppController],
})
export class ApiGatewayModule {}
