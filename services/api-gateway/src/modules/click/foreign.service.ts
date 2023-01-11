import { click } from '@tds/contracts/grpc'
import { ConfigService } from '../config'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly clickService

  constructor(private readonly configService: ConfigService) {
    this.clickService = this.configService.getGrpcClickService()
  }

  addClick(args: click.IAddClickRequest): Promise<click.IAddClickResponse> {
    return firstValueFrom(this.clickService.addClick(args))
  }
}
