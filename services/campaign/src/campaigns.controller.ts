import { Controller, Get } from '@nestjs/common'
import { CampaignsService } from './campaigns.service'

@Controller()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  getHello(): string {
    return this.campaignsService.getHello()
  }
}
