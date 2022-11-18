import { AffiliateNetworkSaveDTO } from './dto/affiliate-network-save.DTO';
import { AffiliateNetwork } from './entities/affiliate-network.entity';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AffiliateNetworkService {
  constructor(private readonly entityManager: EntityManager) {}

  async save(input: AffiliateNetworkSaveDTO) {
    if (input.id) {
      await this.entityManager.findOneByOrFail(AffiliateNetwork, {
        id: input.id,
      });
    }

    return this.entityManager.save(AffiliateNetwork, input);
  }
}
