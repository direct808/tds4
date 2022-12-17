import { Column, Entity } from 'typeorm'

@Entity()
export class Click {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string
}
