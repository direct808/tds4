import { Injectable } from '@nestjs/common'
import { Any, EntityManager } from 'typeorm'
import { OfferGroup } from './entities'
import { OfferGroupSaveDTO } from './dto'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class OfferGroupService {
  constructor(private readonly entityManager: EntityManager) {}

  async find(input?: FindArgs) {
    return this.entityManager.find(OfferGroup, {
      where: {
        ...(input?.ids?.length ? { id: Any(input.ids) } : {}),
      },
    })
  }

  async save(input: OfferGroupSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(OfferGroup, {
        id: input.id,
      })
    }

    return this.entityManager.save(OfferGroup, input)
  }
}
