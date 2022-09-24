import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

@Injectable()
export class QueryService {
  @Query()
  campaignList() {
    return [];
  }
}
