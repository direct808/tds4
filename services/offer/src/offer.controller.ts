import { GrpcMethod } from '@nestjs/microservices'
import { Controller, UsePipes } from '@nestjs/common'
import { offer } from '@tds/contracts/grpc'
import { convertEnum, GrpcValidationPipe } from '@tds/common'
import { OfferService } from './offer.service'
import { GetOfferListDTO } from './dto'
import { grpc } from '@tds/contracts'
import {
  OfferActionType,
  OfferRedirectType,
  OfferType,
} from '@tds/contracts/gql'

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
    const offers = await this.offerService.find(args)

    return {
      offers: offers.map((offer) => ({
        ...offer,
        type: convertEnum(OfferType, grpc.offer.OfferType, offer.type),
        redirectType: convertEnum(
          OfferRedirectType,
          grpc.global.RedirectType,
          offer.redirectType,
        ),
        actionType: convertEnum(
          OfferActionType,
          grpc.global.ActionType,
          offer.actionType,
        ),
      })),
    }
  }
}
