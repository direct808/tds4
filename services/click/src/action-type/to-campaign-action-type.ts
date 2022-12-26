import { ActionType } from './action-type'
import { grpc } from '@tds/contracts'
import { campaign } from '@tds/contracts/grpc'
import { ForeignService } from '../foreign.service'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common'
import { ClickService } from '../click.service'

const MAX_REDIRECTS = 1

@Injectable({ scope: Scope.REQUEST })
export class ToCampaignActionType implements ActionType {
  private redirectCount = 0

  constructor(
    private readonly foreignService: ForeignService,
    @Inject(forwardRef(() => ClickService))
    private readonly clickService: ClickService,
  ) {}

  async handle(
    stream: campaign.CampaignStream,
  ): Promise<grpc.click.AddClickResponse> {
    if (this.redirectCount >= MAX_REDIRECTS) {
      // todo вывести это в браузер
      throw new Error('To many redirects')
    }
    const campaign = await this.getCampaignById(stream.actionCampaignId!)
    this.redirectCount++
    console.log('To campaign', campaign, 'redirectCount', this.redirectCount)

    return this.clickService.addByCampaign(campaign)
  }

  private async getCampaignById(id: string) {
    const { campaign } = await this.foreignService.getCampaignFull({ id })

    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }
    return campaign
  }
}
