import { Module } from '@nestjs/common'
import { QueryService } from './query.service'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import path from 'path'
import { CampaignService } from './campaign.service'
import { DatabaseModule } from '@tds/common'
import { Campaign } from './entities'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [
        path.resolve(
          __dirname,
          '../../../../contracts/graphql/campaign.graphql',
        ),
      ],
    }),
    DatabaseModule.forRoot([Campaign], 'campaign'),
  ],
  providers: [QueryService, CampaignService],
})
export class CampaignModule {}
