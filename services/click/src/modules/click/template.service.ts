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
  parse(
    template: string,
    clickData: ClickData,
    options: { encodeUri: boolean },
  ) {
    const res = templateParser(template, {
      encodeUri: options.encodeUri,
      values: {
        offer: notRealized,
        subid: notRealized,
        external_id: clickData.externalId,
        tid: notRealized,
        revenue: notRealized,
        ad_campaign_id: clickData.adCampaignId,
        browser_version: clickData.browserVersion,
        browser: clickData.browser,
        city: notRealized,
        connection_type(lang: string) {
          return notRealized
        },
        cost: clickData.cost,
        current_domain: notRealized,
        creative_id: clickData.creativeId,
        date(format: string) {
          return new Date().toUTCString()
        },
        device_model: clickData.deviceModel,
        device_type(lang: string) {
          return notRealized
        },
        destination: notRealized,
        from_file(file: string) {
          return notRealized
        },
        ip: clickData.ip,
        is_bot: notRealized,
        is_using_proxy: notRealized,
        isp: notRealized,
        keyword: (charset: string) => {
          return clickData.keyword
        },
        landing_id: notRealized,
        language: clickData.language,
        offer_id: clickData.offerId,
        os_version: clickData.osVersion,
        os: clickData.os,
        parent_campaign_id: notRealized,
        profit: notRealized,
        source: clickData.source,
        stream_id: clickData.streamId,

        sub_id_1: clickData.subId1,
        sub_id_2: clickData.subId2,
        sub_id_3: clickData.subId3,
        sub_id_4: clickData.subId4,
        sub_id_5: clickData.subId5,
        sub_id_6: clickData.subId6,
        sub_id_7: clickData.subId7,
        sub_id_8: clickData.subId8,
        sub_id_9: clickData.subId9,
        sub_id_10: clickData.subId10,
        sub_id_11: clickData.subId11,
        sub_id_12: clickData.subId12,
        sub_id_13: clickData.subId13,
        sub_id_14: clickData.subId14,
        sub_id_15: clickData.subId15,

        traffic_source_name: notRealized,
        ts_id: clickData.trafficSourceId,
        visitor_code: notRealized,
        campaign_id: clickData.campaignId,
        campaign_name: clickData.campaignName,
        country(lang: string) {
          return notRealized
        },
        operator(lang: string) {
          return notRealized
        },
        referrer: clickData.referer,
        referer: clickData.referer,
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
