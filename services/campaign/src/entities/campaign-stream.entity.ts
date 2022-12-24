import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Campaign } from './campaign.entity'
import { gql } from '@tds/contracts'
import { StreamOffer } from './stream-offer.entity'

@Entity()
export class CampaignStream {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @ManyToOne(() => Campaign, (campaign) => campaign.streams, {
    nullable: false,
  })
  declare campaign: Campaign

  @Column()
  declare campaignId: string

  @Column('enum', { nullable: false, enum: gql.CampaignStreamSchema })
  declare schema: gql.CampaignStreamSchema

  @Column('enum', { nullable: true, enum: gql.StreamRedirectType })
  declare redirectType: gql.StreamRedirectType | null

  @Column('text', { nullable: true })
  declare redirectUrl: string | null

  @Column('enum', { nullable: true, enum: gql.StreamActionType })
  declare actionType: gql.StreamActionType | null

  @Column('uuid', { nullable: true })
  declare actionCampaignId: string | null

  @Column('text', { nullable: true })
  declare actionContent: string | null

  @OneToMany(() => StreamOffer, (offer) => offer.stream)
  declare offers: StreamOffer[] | null
}
