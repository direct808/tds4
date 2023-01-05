import { templateParser } from '@tds/common'
import { Injectable } from '@nestjs/common'
import { ClickData } from './click-data'

const random = (min: string | number, max: string | number): number => {
  const mi = Number(min)
  const ma = Number(max)

  return Math.floor(Math.random() * (ma - mi + 1)) + mi
}

const baseFunctions = {
  random,
  sample(...items: string[]): string {
    return items[random(0, items.length - 1)]
  },
}

const notRealized = 'NOT REALIZED'

@Injectable()
export class TemplateService {
  constructor(private readonly clickData: ClickData) {}
  parse(template: string, options: { encodeUri: boolean }) {
    const res = templateParser(template, {
      encodeUri: options.encodeUri,
      values: {
        offer: notRealized,
        subid: notRealized,
        external_id: this.clickData.externalId,
        tid: notRealized,
        revenue: notRealized,
        ad_campaign_id: this.clickData.adCampaignId,
        browser_version: this.clickData.browserVersion,
        browser: this.clickData.browser,
        city: notRealized,
        connection_type(lang: string) {
          return notRealized
        },
        cost: this.clickData.cost,
        current_domain: notRealized,
        creative_id: this.clickData.creativeId,
        date(format: string) {
          return new Date().toUTCString()
        },
        device_model: this.clickData.deviceModel,
        device_type(lang: string) {
          return notRealized
        },
        destination: notRealized,
        from_file(file: string) {
          return notRealized
        },
        ip: this.clickData.ip,
        is_bot: notRealized,
        is_using_proxy: notRealized,
        isp: notRealized,
        keyword: (charset: string) => {
          return this.clickData.keyword
        },
        landing_id: notRealized,
        language: this.clickData.language,
        offer_id: this.clickData.offerId,
        os_version: this.clickData.osVersion,
        os: this.clickData.os,
        parent_campaign_id: notRealized,
        profit: notRealized,
        source: this.clickData.source,
        stream_id: this.clickData.streamId,

        sub_id_1: this.clickData.subId1,
        sub_id_2: this.clickData.subId2,
        sub_id_3: this.clickData.subId3,
        sub_id_4: this.clickData.subId4,
        sub_id_5: this.clickData.subId5,
        sub_id_6: this.clickData.subId6,
        sub_id_7: this.clickData.subId7,
        sub_id_8: this.clickData.subId8,
        sub_id_9: this.clickData.subId9,
        sub_id_10: this.clickData.subId10,
        sub_id_11: this.clickData.subId11,
        sub_id_12: this.clickData.subId12,
        sub_id_13: this.clickData.subId13,
        sub_id_14: this.clickData.subId14,
        sub_id_15: this.clickData.subId15,

        traffic_source_name: notRealized,
        ts_id: this.clickData.trafficSourceId,
        visitor_code: notRealized,
        campaign_id: this.clickData.campaignId,
        campaign_name: this.clickData.campaignName,
        country(lang: string) {
          return notRealized
        },
        operator(lang: string) {
          return notRealized
        },
        referrer: this.clickData.referer,
        referer: this.clickData.referer,
        region(lang: string) {
          return notRealized
        },
        search_engine: notRealized,
        conversion_cost: notRealized,
        conversion_revenue: notRealized,
        conversion_profit: notRealized,
        conversion_time(format: string) {
          return notRealized
        },
        original_status: notRealized,
        status: notRealized,

        ...baseFunctions,
      },
    })

    return res
  }
}
