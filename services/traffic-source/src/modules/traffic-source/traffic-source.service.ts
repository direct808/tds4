import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { TrafficSource } from '../../entities'
import { TrafficSourceSaveDTO } from '../../dto'

type FindArgs = {
  ids?: string[]
}

@Injectable()
export class TrafficSourceService {
  constructor(private readonly entityManager: EntityManager) {}

  async find(args?: FindArgs) {
    const { ids } = args ?? {}

    return this.entityManager.find(TrafficSource, {
      where: {
        ...(ids ? { id: Any(ids) } : {}),
      },
    })
  }

  async save(input: TrafficSourceSaveDTO): Promise<TrafficSource> {
    if (input.id) {
      await this.entityManager.findOneByOrFail(TrafficSource, {
        id: input.id,
      })
    }

    return this.entityManager.save(TrafficSource, input)
  }
}
