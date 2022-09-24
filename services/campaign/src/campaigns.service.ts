import { Injectable } from '@nestjs/common';

@Injectable()
export class CampaignsService {
  getHello(): string {
    return 'Hello World!';
  }
}
