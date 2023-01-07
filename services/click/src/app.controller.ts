import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { click } from '@tds/contracts/grpc'
import { GrpcValidationPipe } from '@tds/common'
import { ClickInputDTO } from './dto'
import { ClickService } from './modules/click'

@Controller()
@UsePipes(GrpcValidationPipe)
export class AppController
  implements Record<keyof click.ClickService, unknown>
{
  constructor(protected readonly clickService: ClickService) {}

  @GrpcMethod('ClickService')
  addClick(args: ClickInputDTO): Promise<click.AddClickResponse> {
    return this.clickService.add()
  }
}
