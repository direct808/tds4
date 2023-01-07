import { StreamOfferInputDTO } from '../../../dto'
import { StreamOffer } from '../../../entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ForeignService } from './foreign.service'
import { unique } from '@tds/common'

type SaveManyArgs = {
  streamId: string
  offers: StreamOfferInputDTO[]
  manager: EntityManager
}

@Injectable()
export class StreamOfferService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
  ) {}

  findByStreamIds(streamIds: string[]) {
    return this.entityManager.find(StreamOffer, {
      where: { streamId: Any(streamIds) },
    })
  }

  async saveMany({ streamId, offers, manager }: Readonly<SaveManyArgs>) {
    const allOffers = await manager.find(StreamOffer, {
      where: {
        streamId,
      },
    })

    const offersForDelete = allOffers.filter(
      (offer) => !offers.map((o) => o.id).includes(offer.id),
    )

    if (offersForDelete.length) {
      await manager.delete(StreamOffer, offersForDelete)
    }

    this.#checkNotFoundId(offers, allOffers)

    if (offers.length === 0) {
      return
    }

    this.checkPercentSum(offers)

    const entities = offers.map((offer) => ({
      ...offer,
      streamId,
    }))

    const offerIds = offers.map((of) => of.offerId)

    if (offerIds.length !== unique(offerIds).length) {
      throw new Error('Duplicate offer Ids')
    }

    const existsOffers = await this.foreignService.getOfferList({
      ids: offerIds,
    })

    if (offerIds.length !== existsOffers.length) {
      throw new Error('Offer not exists')
    }

    return manager.save(StreamOffer, entities)
  }

  #checkNotFoundId(
    inputOffers: { id?: string }[],
    allOffers: { id: string }[],
  ) {
    const streamsForUpdateIds = inputOffers
      .filter((stream) => stream.id)
      .map((stream) => stream.id!)

    if (!streamsForUpdateIds.length) {
      return
    }

    const idNotFoundStreams = streamsForUpdateIds.filter(
      (id) => !allOffers.map((s) => s.id).includes(id),
    )
    if (idNotFoundStreams.length) {
      throw new Error('id not found')
    }
  }

  private checkPercentSum(offers: StreamOfferInputDTO[]) {
    const sum = offers
      .filter((offer) => offer.active)
      .reduce((accum, cur) => accum + cur.percent, 0)
    if (sum !== 100) {
      throw new Error('Sum of percent must be 100 cur ' + sum)
    }
  }
}
