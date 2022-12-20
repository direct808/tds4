import { ActionType } from './action-type'
import { grpc } from '@tds/contracts'
import { campaign } from '@tds/contracts/grpc'
import { ForeignService } from '../foreign.service'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ClickService } from '../click.service'

@Injectable()
export class ToCampaignActionType implements ActionType {
  constructor(
    private readonly foreignService: ForeignService,
    @Inject(forwardRef(() => ClickService))
    private readonly clickService: ClickService,
  ) {}

  async handle(
    stream: campaign.CampaignStream,
  ): Promise<grpc.click.AddClickResponse> {
    const campaign = await this.getCampaignById(stream.actionCampaignId!)
    console.log('To campaign', campaign)
    return this.clickService.addByCampaign(campaign)
  }

  private async getCampaignById(id: string) {
    const { result } = await this.foreignService.getCampaignList({
      ids: [id],
    })
    const [campaign] = result!
    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }
    return campaign
  }
}
