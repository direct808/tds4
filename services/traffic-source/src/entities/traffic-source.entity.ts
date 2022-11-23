import { Column, Entity } from 'typeorm'

@Entity()
export class TrafficSource {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string
}
