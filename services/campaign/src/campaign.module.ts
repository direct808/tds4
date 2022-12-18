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
import { CampaignGroupService } from './campaign-group.service'
import { ForeignService } from './foreign.service'
import { ConfigService } from './config.service'
import { CampaignResolver } from './resolvers'
import { CampaignGroupLoader, CampaignStreamLoader } from './loaders'
import { CampaignStreamService } from './campaign-stream.service'
import { CampaignController } from './campaign.controller'

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
      [path.join(__dirname, './entities/*.entity.{ts,js}')],
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
  controllers: [CampaignController],
})
export class CampaignModule {}
