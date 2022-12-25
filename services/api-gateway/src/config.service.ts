import { join } from 'path'
import { contractsPath, EnvDTO, makeGrpcService } from '@tds/common'
import { click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  constructor(private readonly env: EnvDTO) {}
  getGrpcClickService() {
    return makeGrpcService<click.ClickService>('ClickService', {
      url: this.env.SERVICE_CLICK_GRPC_URL,
      package: 'tds.click',
      protoPath: join(contractsPath, 'grpc/click.proto'),
    })
  }
}
