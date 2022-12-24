import { join } from 'path'
import { contractsPath, makeGrpcService } from '@tds/common'
import { campaign } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  getGrpcCampaignService() {
    return makeGrpcService<campaign.CampaignService>('CampaignService', {
      url: 'localhost:4015',
      package: 'tds.campaign',
      protoPath: join(contractsPath, 'grpc/campaign.proto'),
    })
  }
}
