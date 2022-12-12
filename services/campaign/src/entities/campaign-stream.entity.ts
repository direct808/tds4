import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Campaign } from './campaign.entity'

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
}
