import { Column, Entity, ManyToOne } from 'typeorm'
import { OfferGroup } from './offer-group.entity'

export enum OfferType {
  LOCAL = 'LOCAL',
  REDIRECT = 'REDIRECT',
  PRELOAD = 'PRELOAD',
  ACTION = 'ACTION',
}

export enum OfferRedirectType {
  HTTP = 'HTTP',
  META = 'META',
  JS = 'JS',
  WITHOUT_REFERER = 'WITHOUT_REFERER',
  CURL = 'CURL',
  META2 = 'META2',
  FORM_SUBMIT = 'FORM_SUBMIT',
  IFRAME = 'IFRAME',
  REMOTE = 'REMOTE',
}
export enum OfferActionType {
  TO_CAMPAIGN = 'TO_CAMPAIGN',
  SHOW404 = 'SHOW404',
  SHOW_TEXT = 'SHOW_TEXT',
  SHOW_HTML = 'SHOW_HTML',
  NOTHING = 'NOTHING',
}

@Entity()
export class Offer {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @Column('uuid', { nullable: true })
  declare affiliateNetworkId: string | null

  @Column('uuid', { nullable: true })
  declare groupId: string | null

  @ManyToOne(() => OfferGroup, (group) => group.offers)
  declare group: OfferGroup

  @Column('enum', { nullable: false, enum: OfferType })
  declare type: OfferType

  @Column('text', { nullable: true })
  declare file: string | null

  @Column('enum', { nullable: true, enum: OfferRedirectType })
  declare redirectType: OfferRedirectType | null

  @Column('text', { nullable: true })
  declare redirectUrl: string | null

  @Column('text', { nullable: true })
  declare preloadUrl: string | null

  @Column('enum', { nullable: true, enum: OfferActionType })
  declare actionType: OfferActionType | null

  @Column('uuid', { nullable: true })
  declare actionCampaignId: string | null

  @Column('text', { nullable: true })
  declare actionContent: string | null
}
