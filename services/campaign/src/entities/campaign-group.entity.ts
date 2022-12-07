import { Column, Entity, OneToMany } from 'typeorm'
import { Campaign } from './campaign.entity'

@Entity()
export class CampaignGroup {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @OneToMany(() => Campaign, (campaign) => campaign.groupId)
  declare campaigns: Campaign[]
}
