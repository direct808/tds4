import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { click } from '@tds/contracts/grpc'
import { GrpcValidationPipe } from '@tds/common'
import { AddClickDTO } from './dto'
import { ClickService } from './click.service'

@Controller()
@UsePipes(GrpcValidationPipe)
export class ClickController {
  constructor(protected readonly clickService: ClickService) {}

  @GrpcMethod('ClickService')
  addClick(args: AddClickDTO): Promise<click.AddClickResponse> {
    return this.clickService.add(args)
  }
}
