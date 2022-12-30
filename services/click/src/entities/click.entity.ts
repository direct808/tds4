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

  // из параметров или домен из referer
  @Column('text', { nullable: true, comment: 'Источник (из параметров)' })
  declare source: string | null

  @Column('text', { nullable: true, comment: 'Параметр из заголовка' })
  declare referer: string | null

  // из параметров или из referer поисковика
  @Column('text', { nullable: true })
  declare keyword: string | null

  @Column('text', { nullable: true, comment: 'userAgent из header' })
  declare userAgent: string | null

  @Column('inet')
  declare ip: string

  @Column('timestamp')
  declare dateTime: Date

  /*
 {
  "sign": 1,        ???
  "version": 1,     ???
  "click_id": "848807a2-5724-5283-8749-4552fb439dea",
  "sub_id": "55inah1cvpe0",  ????
  "visitor_code": "55inah",  ????
  xRequestedWith - понятно что, но где он используется?
  searchEngine - не вычисляется из referer, непонятно откуда берется
  "ad_campaign_id": "ad73",   из параметра
  "external_id": "click400",  из параметра
  "creative_id": "banner16",  из параметра
  "sub_id_1": "x9818",        из параметра
  "sub_id_2": "x6812",        из параметра
  "sub_id_3": "x8904",        из параметра
  "sub_id_4": "",             из параметра
  "sub_id_5": "",             из параметра
  "sub_id_6": "",             из параметра
  "sub_id_7": "",             из параметра
  "sub_id_8": "",             из параметра
  "sub_id_9": "",             из параметра
  "sub_id_10": "",
  "sub_id_11": "",
  "sub_id_12": "",
  "sub_id_13": "",
  "sub_id_14": "",
  "sub_id_15": "",

  "connection_type": "Сотовая связь",
  "operator": "	МТС Россия",
  "isp": "",
  "country_code": "RU",
  "country": "Россия",
  "region": "Moskovskaya oblast'",
  "region_code": "RU_MOS",
  "city": "Podol'sk",
  "language": "Английский",
  "device_type": "Десктоп",

  "os": "Chrome OS",
  "os_version": "45.0.2454.86",
  "browser": "Chrome",
  "browser_version": "45.0.2454.86",
  "device_model": "",
  "ip": "95.28.45.181",
  "ip_mask1": "95.28.0.0 - 95.28.255.255",
  "ip_mask2": "95.28.45.0 - 95.28.45.255",
  "extra_param_1": "",
  "extra_param_2": "",
  "extra_param_3": "",
  "extra_param_4": "",
  "extra_param_5": "",
  "extra_param_6": "",
  "extra_param_7": "",
  "extra_param_8": "",
  "extra_param_9": "",
  "extra_param_10": "",
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
  "cost": 0,
  "revenue": 0,
  "profit": 0,
  "lead_revenue": 0,
  "sale_revenue": 0,
  "rejected_revenue": 0,
  "rebills": 0,
  "parent_sub_id": null
}
   */
}
