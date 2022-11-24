import { Column, Entity } from 'typeorm'

@Entity()
export class Offer {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string
}
