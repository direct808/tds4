import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { CampaignStream } from './campaign-stream.entity'

@Entity()
@Unique(['offerId', 'streamId'])
export class StreamOffer {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column('uuid')
  declare offerId: string

  @Column('smallint')
  declare percent: number

  @Column('boolean')
  declare active: boolean

  @ManyToOne(() => CampaignStream, (stream) => stream.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  declare stream: CampaignStream

  @Column()
  declare streamId: string
}
