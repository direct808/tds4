import { Column, Entity, ManyToOne } from 'typeorm'
import { CampaignGroup } from './campaign-group.entity'

@Entity()
export class Campaign {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @Column('uuid', { nullable: true })
  declare trafficSourceId: string | null

  @Column('uuid', { nullable: true })
  declare groupId: string | null

  @ManyToOne(() => CampaignGroup, (group) => group.campaigns)
  declare group: CampaignGroup

  @Column()
  declare active: boolean
}
