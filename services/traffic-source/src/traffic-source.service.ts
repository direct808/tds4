import { EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { TrafficSource } from './entities/traffic-source.entity'
import { TrafficSourceSaveDTO } from './dto'

@Injectable()
export class TrafficSourceService {
  constructor(private readonly entityManager: EntityManager) {}

  async find() {
    return this.entityManager.findAndCount(TrafficSource)
  }

  async save(input: TrafficSourceSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(TrafficSource, {
        id: input.id,
      })
    }

    return this.entityManager.save(TrafficSource, input)
  }
}
