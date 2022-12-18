import { Column, Entity, Index, ManyToOne, OneToMany, Unique } from 'typeorm'
import { CampaignGroup } from './campaign-group.entity'
import { CampaignStream } from './campaign-stream.entity'

@Entity()
export class Campaign {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @Column()
  @Index({ unique: true })
  declare code: string

  @Column('uuid', { nullable: true })
  declare trafficSourceId: string | null

  @Column('uuid', { nullable: true })
  declare groupId: string | null

  @ManyToOne(() => CampaignGroup, (group) => group.campaigns)
  declare group: CampaignGroup

  @OneToMany(() => CampaignStream, (stream) => stream.campaign)
  declare streams: CampaignStream[]

  @Column()
  declare active: boolean
}
