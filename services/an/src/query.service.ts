import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { AffiliateNetworkService } from './affiliate-network.service';
import { AffiliateNetworkSaveDTO } from './dto/affiliate-network-save.DTO';

@Injectable()
export class QueryService {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @Query()
  affiliateNetworkList() {
    return [
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
      { id: '123123', name: '333333333333' },
    ];
  }

  @Mutation()
  affiliateNetworkSave(@Args('input') input: AffiliateNetworkSaveDTO) {
    return this.affiliateNetworkService.save(input);
  }
}
