import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { QueryService } from './query.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./campaign.graphql'],
      // debug: false,
      // playground: false,
    }),
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, QueryService],
})
export class CampaignsModule {}

// 8928 27 52 825
