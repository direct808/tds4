import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { readFileSync } from 'fs'
import path from 'path'
import { ClickController } from './click.controller'
import { ClickModule } from './modules/click'
import { ConfigModule } from './modules/config'

@Global()
@Module({
  imports: [
    ClickModule,
    ConfigModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
      },
      gateway: {
        supergraphSdl: readFileSync(
          path.join(__dirname, '../schema.graphql'),
        ).toString(),
      },
    }),
  ],
  controllers: [ClickController],
})
export class ApiGatewayModule {}
