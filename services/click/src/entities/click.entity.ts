import { Column, Entity } from 'typeorm'

@Entity()
export class Click {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column('uuid')
  declare campaignId: string

  @Column('uuid', { nullable: true })
  declare campaignGroupId: string | null

  @Column('uuid', { nullable: true })
  declare landingId: string | null

  @Column('uuid', { nullable: true })
  declare offerId: string | null

  @Column('uuid', { nullable: true })
  declare affiliateNetworkId: string | null

  @Column('uuid', { nullable: true })
  declare trafficSourceId: string | null

  @Column('uuid', { nullable: true })
  declare streamId: string | null

  @Column('inet')
  declare ip: string

  @Column('timestamp')
  declare dateTime: Date

  // HEADER INFO

  @Column('text', { nullable: true, comment: 'Параметр из заголовка' })
  declare referer: string | null

  @Column('text', { nullable: true, comment: 'userAgent из header' })
  declare userAgent: string | null

  @Column('char', { length: 2, nullable: true })
  declare language: string | null

  // USER AGENT INFO

  @Column('text', { nullable: true })
  declare deviceType: string | null
  @Column('text', { nullable: true })
  declare os: string | null
  @Column('text', { nullable: true })
  declare osVersion: string | null
  @Column('text', { nullable: true })
  declare browser: string | null
  @Column('text', { nullable: true })
  declare browserVersion: string | null
  @Column('text', { nullable: true })
  declare deviceModel: string | null

  // FROM QUERY STRING

  // из параметров или из referer поисковика
  @Column('text', { nullable: true })
  declare keyword: string | null

  // из параметров или домен из referer
  @Column('text', { nullable: true, comment: 'Источник (из параметров)' })
  declare source: string | null

  @Column('text', { nullable: true })
  declare cost: string | null

  @Column('text', { nullable: true })
  declare externalId: string | null

  @Column('text', { nullable: true })
  declare creativeId: string | null

  @Column('text', { nullable: true })
  declare adCampaignId: string | null

  @Column('text', { nullable: true })
  declare subId1: string | null

  @Column('text', { nullable: true })
  declare subId2: string | null

  @Column('text', { nullable: true })
  declare subId3: string | null

  @Column('text', { nullable: true })
  declare subId4: string | null

  @Column('text', { nullable: true })
  declare subId5: string | null

  @Column('text', { nullable: true })
  declare subId6: string | null

  @Column('text', { nullable: true })
  declare subId7: string | null

  @Column('text', { nullable: true })
  declare subId8: string | null

  @Column('text', { nullable: true })
  declare subId9: string | null

  @Column('text', { nullable: true })
  declare subId10: string | null

  @Column('text', { nullable: true })
  declare subId11: string | null

  @Column('text', { nullable: true })
  declare subId12: string | null

  @Column('text', { nullable: true })
  declare subId13: string | null

  @Column('text', { nullable: true })
  declare subId14: string | null

  @Column('text', { nullable: true })
  declare subId15: string | null

  @Column('text', { nullable: true })
  declare extraParam1: string | null

  @Column('text', { nullable: true })
  declare extraParam2: string | null

  @Column('text', { nullable: true })
  declare extraParam3: string | null

  @Column('text', { nullable: true })
  declare extraParam4: string | null

  @Column('text', { nullable: true })
  declare extraParam5: string | null

  @Column('text', { nullable: true })
  declare extraParam6: string | null

  @Column('text', { nullable: true })
  declare extraParam7: string | null

  @Column('text', { nullable: true })
  declare extraParam8: string | null

  @Column('text', { nullable: true })
  declare extraParam9: string | null

  @Column('text', { nullable: true })
  declare extraParam10: string | null

  /*
 {
  "sign": 1,        ???
  "version": 1,     ???
  "click_id": "848807a2-5724-5283-8749-4552fb439dea",
  "sub_id": "55inah1cvpe0",  ????
  "visitor_code": "55inah",  ????
  xRequestedWith - понятно что, но где он используется?
  searchEngine - не вычисляется из referer, непонятно откуда берется

  "connection_type": "Сотовая связь",
  "operator": "	МТС Россия",
  "isp": "",
  "country_code": "RU",
  "country": "Россия",
  "region": "Moskovskaya oblast'",
  "region_code": "RU_MOS",
  "city": "Podol'sk",
  language: Английский     !!!

  "device_type": "Десктоп",
  "os": "Chrome OS",
  "os_version": "45.0.2454.86",
  "browser": "Chrome",
  "browser_version": "45.0.2454.86",
  "device_model": "",

  "ip": "95.28.45.181",
  "ip_mask1": "95.28.0.0 - 95.28.255.255",
  "ip_mask2": "95.28.45.0 - 95.28.45.255",

  "datetime": "2022-11-11 14:01:17",
  "year": "2022",
  "month": "2022/11",
  "week": "14.11.2022 - 08.11.2022",
  "weekday": "5",
  "day": "2022-11-11",
  "hour": "14",
  "day_hour": "2022111114",
  "landing_clicked_datetime": null,
  "destination": "Do nothing",   - Url редиректа или название действия
  "is_unique_stream": false,
  "is_unique_campaign": false,
  "is_unique_global": false,
  "is_bot": false,
  "is_empty_referrer": false,
  "is_using_proxy": false,
  "landing_clicked": false,
  "is_lead": false,
  "is_sale": false,
  "is_rejected": false,
  "parent_campaign_id": 0,
  "parent_campaign": null,
  "now": "2022-12-28 17:14:56",
  "cost": 0,  !!!
  "revenue": 0,
  "profit": 0,
  "lead_revenue": 0,
  "sale_revenue": 0,
  "rejected_revenue": 0,
  "rebills": 0,
  "parent_sub_id": null

  "ad_campaign_id": "ad73",   из параметра   !!!
  "external_id": "click400",  из параметра  !!!
  "creative_id": "banner16",  из параметра   !!!
  sub_id_1 - 15 "x9818",        из параметра  !!!
    extra_param_1 - 10 !!! из query string
}
   */
}
