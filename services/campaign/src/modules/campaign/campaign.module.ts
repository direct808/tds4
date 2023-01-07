import { Module } from '@nestjs/common'
import {
  CampaignGroupService,
  CampaignService,
  CampaignStreamService,
  ForeignService,
  StreamOfferService,
} from './services'
import {
  CampaignGroupLoader,
  CampaignStreamLoader,
  StreamOfferLoader,
} from './loaders'
import { ConfigModule } from '../config'

@Module({
  imports: [ConfigModule],
  providers: [
    CampaignService,
    CampaignGroupService,
    CampaignStreamService,
    StreamOfferService,
    ForeignService,
    // loaders
    CampaignGroupLoader,
    CampaignStreamLoader,
    StreamOfferLoader,
  ],
  exports: [
    CampaignService,
    CampaignGroupService,
    CampaignStreamService,
    CampaignGroupLoader,
    CampaignStreamLoader,
    StreamOfferLoader,
  ],
})
export class CampaignModule {}
