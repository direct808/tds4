import { join, resolve } from 'path'
import { makeGrpcService } from '@tds/common'
import { click } from '@tds/contracts/grpc'
import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'

export const contractsPath = join(__dirname, '../../../../contracts')

dotenv.config({ path: resolve(__dirname + './../../../../.env') })

@Injectable()
export class ConfigService {
  getGrpcClickService() {
    return makeGrpcService<click.ClickService>('ClickService', {
      url: 'localhost:4016',
      package: 'tds.click',
      protoPath: join(contractsPath, 'grpc/click.proto'),
    })
  }
}
