import { Injectable } from '@nestjs/common'
import { AddClickDTO } from './dto'
import { EntityManager } from 'typeorm'
import { Click } from './entities'

@Injectable()
export class ClickService {
  constructor(private readonly entityManager: EntityManager) {}

  add(input: AddClickDTO) {
    return this.entityManager.save(Click, {})
  }
}
