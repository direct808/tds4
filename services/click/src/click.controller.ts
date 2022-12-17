import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { click } from '@tds/contracts'
import { GrpcValidationPipe } from '@tds/common'
import { AddClickDTO } from './dto'

@Controller()
@UsePipes(GrpcValidationPipe)
export class ClickController {
  @GrpcMethod('ClickService')
  async addClick(args: AddClickDTO): Promise<click.IAddClickResponse> {
    return { message: args.name + ' ok' }
  }
}
