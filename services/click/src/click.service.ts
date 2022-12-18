import { Injectable, NotFoundException } from '@nestjs/common'
import { AddClickDTO } from './dto'
import { EntityManager } from 'typeorm'
import { Click } from './entities'
import { ForeignService } from './foreign.service'
import { click } from '@tds/contracts'

@Injectable()
export class ClickService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly foreignService: ForeignService,
  ) {}

  async add(args: AddClickDTO): Promise<click.AddClickResponse> {
    try {
      return await this.#add(args)
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          type: click.ResponseType.NOT_FOUND,
        }
      }
      throw e
    }
  }

  async #add(args: AddClickDTO): Promise<click.AddClickResponse> {
    const campaign = await this.#getCampaignByCode(args.campaignCode)
    await this.entityManager.save(Click, {})
    return {
      type: click.ResponseType.CONTENT,
      content: 'form click service',
    }
  }

  async #getCampaignByCode(code: string) {
    const { result } = await this.foreignService.getCampaignList({
      codes: [code],
    })
    const [campaign] = result!
    if (!campaign) {
      throw new NotFoundException('No campaign found')
    }
    return campaign
  }
}
