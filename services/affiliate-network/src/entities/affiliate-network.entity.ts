import { Column, Entity } from 'typeorm'

@Entity()
export class AffiliateNetwork {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @Column('text', { nullable: true })
  declare offerParam: string | null

  @Column('text', { nullable: true })
  declare postbackUrl: string | null
}
