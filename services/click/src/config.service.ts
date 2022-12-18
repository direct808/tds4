import { join, resolve } from 'path'
import { makeGrpcService } from '@tds/common'
import { campaign } from '@tds/contracts'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

export const contractsPath = join(__dirname, '../../../../contracts')

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

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
