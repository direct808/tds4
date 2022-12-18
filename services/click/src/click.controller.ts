import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { click } from '@tds/contracts'
import { GrpcValidationPipe } from '@tds/common'
import { AddClickDTO } from './dto'
import { ClickService } from './click.service'

@Controller()
@UsePipes(GrpcValidationPipe)
export class ClickController {
  constructor(protected readonly clickService: ClickService) {}

  @GrpcMethod('ClickService')
  async addClick(args: AddClickDTO): Promise<click.IAddClickResponse> {
    const result = await await this.clickService.add(args)
    return { message: args.campaignCode + ' ok' }
  }
}
