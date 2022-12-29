import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { readFileSync } from 'fs'
import path from 'path'
import { ClickController } from './click.controller'
import { ConfigService } from './config.service'
import { ForeignService } from './foreign.service'
import { EnvModule } from '@tds/common'
import { ClickModule } from './modules/click'

@Global()
@Module({
  imports: [
    EnvModule,
    ClickModule,
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
  providers: [ConfigService, ForeignService],
  exports: [ForeignService],
})
export class ApiGatewayModule {}
