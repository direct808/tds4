import { click } from '@tds/contracts/grpc'
import { ConfigService } from './config.service'
import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ForeignService {
  private readonly clickService = this.configService.getGrpcClickService()

  constructor(private readonly configService: ConfigService) {}

  async addClick(args: click.AddClickRequest): Promise<click.AddClickResponse> {
    const result = await firstValueFrom(this.clickService.addClick(args))
    return result
  }
}
