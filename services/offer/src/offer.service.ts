import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Offer } from './entities'
import { OfferSaveDTO } from './dto'

@Injectable()
export class OfferService {
  constructor(private readonly entityManager: EntityManager) {}

  async find() {
    return this.entityManager.findAndCount(Offer)
  }

  async save(input: OfferSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(Offer, {
        id: input.id,
      })
    }

    return this.entityManager.save(Offer, input)
  }
}
