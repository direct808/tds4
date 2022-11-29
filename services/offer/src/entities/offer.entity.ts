import { Column, Entity } from 'typeorm'

export enum OfferType {
  local = 'local',
  redirect = 'redirect',
  preload = 'preload',
  action = 'action',
}

export enum OfferRedirectType {
  http = 'http',
  meta = 'meta',
  js = 'js',
  withoutReferer = 'withoutReferer',
  curl = 'curl',
  meta2 = 'meta2',
  formSubmit = 'formSubmit',
  iframe = 'iframe',
  remote = 'remote',
}
export enum OfferActionType {
  toCampaign = 'toCampaign',
  show404 = 'show404',
  showText = 'showText',
  showHtml = 'showHtml',
  nothing = 'nothing',
}

@Entity()
export class Offer {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @Column('uuid', { nullable: true })
  declare affiliateNetworkId: string | null

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
