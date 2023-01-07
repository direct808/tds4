import { Module } from '@nestjs/common'
import { OfferService } from './offer.service'
import { ForeignService } from './foreign.service'
import { OfferGroupService } from './offer-group.service'
import { OfferGroupLoader } from './loaders'
import { ConfigModule } from '../config'

@Module({
  imports: [ConfigModule],
  providers: [
    ForeignService,
    OfferService,
    OfferGroupService,
    OfferGroupLoader,
  ],
  exports: [OfferService, OfferGroupService, OfferGroupLoader],
})
export class OfferModule {}
