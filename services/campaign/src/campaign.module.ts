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
import { Campaign, CampaignGroup } from './entities'
import { CampaignGroupService } from './campaign-group.service'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'
import { CampaignResolver } from './resolvers'
import { CampaignGroupLoader } from './loaders'

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
    DatabaseModule.forRoot([Campaign, CampaignGroup], 'campaign'),
  ],
  providers: [
    QueryService,
    CampaignService,
    CampaignGroupService,
    ForeignService,
    ConfigService,
    CampaignResolver,
    CampaignGroupLoader,
  ],
})
export class CampaignModule {}
