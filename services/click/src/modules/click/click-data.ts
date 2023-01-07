import { Injectable, Scope } from '@nestjs/common'
import { grpc } from '@tds/contracts'
import { ClickInputDTO } from '../../dto'
import UAParser from 'ua-parser-js'
import { findValues, queryParameters } from './helpers'
import { parse } from 'node:querystring'
import { camelCase, snakeCase } from 'lodash'

@Injectable({ scope: Scope.REQUEST })
export class ClickData
  implements Record<typeof queryParameters[number], unknown>
{
  offerId?: string | null
  affiliateNetworkId?: string | null
  campaignId!: string
  campaignName!: string
  campaignGroupId?: string | null
  trafficSourceId?: string | null
  streamId?: string | null
  dateTime = new Date()
  ip: string

  userAgent?: string | null
  language?: string | null
  referer?: string | null

  os?: string | null
  osVersion?: string | null
  browser?: string | null
  browserVersion?: string | null
  deviceModel?: string | null
  deviceType?: string | null

  keyword: string | null = null
  cost: string | null = null
  currency: string | null = null
  externalId: string | null = null
  creativeId: string | null = null
  adCampaignId: string | null = null
  source: string | null = null
  subId1: string | null = null
  subId2: string | null = null
  subId3: string | null = null
  subId4: string | null = null
  subId5: string | null = null
  subId6: string | null = null
  subId7: string | null = null
  subId8: string | null = null
  subId9: string | null = null
  subId10: string | null = null
  subId11: string | null = null
  subId12: string | null = null
  subId13: string | null = null
  subId14: string | null = null
  subId15: string | null = null
  extraParam1: string | null = null
  extraParam2: string | null = null
  extraParam3: string | null = null
  extraParam4: string | null = null
  extraParam5: string | null = null
  extraParam6: string | null = null
  extraParam7: string | null = null
  extraParam8: string | null = null
  extraParam9: string | null = null
  extraParam10: string | null = null

  constructor(private readonly clickInput: ClickInputDTO) {
    this.ip = this.clickInput.ip
    this.userAgent = findValues(this.clickInput.headers, 'user-agent')
    this.referer = findValues(this.clickInput.headers, 'referer')
    this.#setUsrAgentInfo()
    this.#setLanguage()
    this.#setQueryParameters()
  }

  public setFromCampaign(campaign: grpc.campaign.Campaign): void {
    this.campaignId = campaign.id!
    this.campaignName = campaign.name!
    this.campaignGroupId = campaign.groupId
    this.trafficSourceId = campaign.trafficSourceId
  }

  public setFromStream(stream: grpc.campaign.CampaignStream): void {
    this.streamId = stream.id
  }

  public setFromOffer(offer: grpc.offer.Offer): void {
    this.offerId = offer.id
    this.affiliateNetworkId = offer.affiliateNetworkId
  }

  #setUsrAgentInfo(): void {
    if (!this.userAgent) {
      return
    }

    const parser = UAParser(this.userAgent)

    this.os = parser.os.name
    this.osVersion = parser.os.version
    this.browser = parser.browser.name
    this.browserVersion = parser.browser.version
    this.deviceModel = parser.device.model
    this.deviceType = parser.device.type
  }

  #setLanguage(): void {
    const languages = findValues(this.clickInput.headers, 'accept-language')

    if (!languages) {
      return
    }

    this.language = languages.substring(0, 2)
  }

  #setQueryParameters(): void {
    const query = parse(this.clickInput.query)

    for (const key of queryParameters) {
      let val = query[snakeCase(key)]

      if (Array.isArray(val)) {
        val = val[val.length - 1]
      }

      if (!val) {
        continue
      }

      const kk = camelCase(key) as typeof queryParameters[number]

      this[kk] = val
    }
  }
}
