import { ActionType, ActionTypeData } from '../action-type'
import { grpc } from '@tds/contracts'
import { ForeignService } from '../../foreign.service'
import { ClickService } from '../../click.service'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ClickData } from '../../click-data'

const MAX_REDIRECTS = 1

@Injectable()
export class ToCampaignActionType implements ActionType {
  private redirectCount = 0

  constructor(
    private readonly foreignService: ForeignService,
    @Inject(forwardRef(() => ClickService))
    private readonly clickService: ClickService,
  ) {}

  async handle(
    data: ActionTypeData,
    clickData: ClickData,
  ): Promise<grpc.click.IAddClickResponse> {
    if (!data.actionCampaignId) {
      throw new Error('No actionCampaignId')
    }

    if (this.redirectCount >= MAX_REDIRECTS) {
      // todo вывести это в браузер
      throw new Error('To many redirects')
    }

    const campaign = await this.getCampaignById(data.actionCampaignId)
    this.redirectCount++
    console.log('To campaign', campaign, 'redirectCount', this.redirectCount)

    return this.clickService.addByCampaign(campaign, clickData)
  }

  private async getCampaignById(id: string) {
    const { campaign } = await this.foreignService.getCampaignFull({ id })

    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }

    return campaign
  }
}
