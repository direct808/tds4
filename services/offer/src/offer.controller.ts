import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { offer } from '@tds/contracts/grpc'
import { GrpcValidationPipe } from '@tds/common'
import { OfferService } from './offer.service'
import { GetOfferListDTO } from './dto'

@Controller()
@UsePipes(GrpcValidationPipe)
export class OfferController
  implements Record<keyof offer.OfferService, unknown>
{
  constructor(private readonly offerService: OfferService) {}

  @GrpcMethod('OfferService')
  async getOfferList(
    args: GetOfferListDTO,
  ): Promise<offer.GetOfferListResponse> {
    const result = await this.offerService.find(args)
    return { result }
  }
}
