import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { click } from '@tds/contracts/grpc'
import { GrpcValidationPipe } from '@tds/common'
import { ClickInputDTO } from './dto'
import { ClickService } from './modules/click'

@Controller()
@UsePipes(GrpcValidationPipe)
// implements Record<keyof click.ClickService, unknown>
export class AppController {
  constructor(protected readonly clickService: ClickService) {}

  @GrpcMethod('ClickService')
  addClick(args: ClickInputDTO): Promise<click.IAddClickResponse> {
    return this.clickService.add(args)
  }
}
