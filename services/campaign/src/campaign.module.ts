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
import { Campaign, CampaignGroup, CampaignStream } from './entities'
import { CampaignGroupService } from './campaign-group.service'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'
import { CampaignResolver } from './resolvers'
import { CampaignGroupLoader, CampaignStreamLoader } from './loaders'
import { CampaignStreamService } from './campaign-stream.service'

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
    DatabaseModule.forRoot(
      [Campaign, CampaignGroup, CampaignStream],
      'campaign',
    ),
  ],
  providers: [
    QueryService,
    CampaignService,
    CampaignGroupService,
    ForeignService,
    ConfigService,
    CampaignResolver,
    CampaignGroupLoader,
    CampaignStreamService,
    CampaignStreamLoader,
  ],
})
export class CampaignModule {}
