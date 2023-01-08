import { join } from 'path'
import {
  contractsPath,
  DBEnvDTO,
  defaultDatabaseConfig,
  getEnvConfig,
  makeGrpcService,
} from '@tds/common'
import { affiliateNetwork, campaign, offer } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import { EnvDTO } from '@tds/common/env/env.DTO'
import { AppEnvDTO } from './app-env.DTO'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: join(__dirname, './../../../../../../.env') })
    dotenv.config({ path: join(__dirname, './../../../.env') })
  })
}

@Injectable()
export class ConfigService {
  env: AppEnvDTO & DBEnvDTO & EnvDTO

  constructor() {
    this.env = {
      ...getEnvConfig(AppEnvDTO),
      ...getEnvConfig(DBEnvDTO),
      ...getEnvConfig(EnvDTO),
    }
  }

  get typeOrmConfig(): ReturnType<typeof defaultDatabaseConfig> {
    return {
      ...defaultDatabaseConfig({
        entities: [join(__dirname, '../../entities/*.entity.{ts,js}')],
        schema: 'click',
        dbEnv: this.env,
      }),
    }
  }

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

  getGrpcAffiliateNetworkService() {
    return makeGrpcService<affiliateNetwork.AffiliateNetworkService>(
      'AffiliateNetworkService',
      {
        url: this.env.SERVICE_AFFILIATE_NETWORK_GRPC_URL,
        package: 'tds.affiliate_network',
        protoPath: join(contractsPath, 'grpc/affiliate-network.proto'),
      },
    )
  }
}
