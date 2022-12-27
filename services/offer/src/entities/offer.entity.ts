import { Column, Entity, ManyToOne } from 'typeorm'
import { OfferGroup } from './offer-group.entity'
import {
  OfferActionType,
  OfferRedirectType,
  OfferType,
} from '@tds/contracts/gql'

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
