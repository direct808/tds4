import { join } from 'path'
import { contractsPath, EnvDTO, makeGrpcService } from '@tds/common'
import { campaign, offer } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  constructor(private readonly env: EnvDTO) {}

  getGrpcCampaignService() {
    return makeGrpcService<campaign.CampaignService>('CampaignService', {
      url: this.env.SERVICE_CAMPAIGN_GRPC_URL,
      package: 'tds.campaign',
      protoPath: join(contractsPath, 'grpc/campaign.proto'),
    })
  }

  getGrpcOfferService() {
    return makeGrpcService<offer.OfferService>('OfferService', {
      url: this.env.SERVICE_OFFER_GRPC_URL,
      package: 'tds.offer',
      protoPath: join(contractsPath, 'grpc/offer.proto'),
    })
  }
}
