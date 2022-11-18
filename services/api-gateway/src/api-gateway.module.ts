import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { readFileSync } from 'fs';
import path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
      },
      gateway: {
        supergraphSdl: readFileSync(
          path.resolve(__dirname, '../schema.graphql'),
        ).toString(),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
