import { Column, Entity } from 'typeorm'

@Entity()
export class User {
  @Column('uuid', { generated: 'uuid', primary: true })
  id!: string

  @Column('varchar', { nullable: false })
  login!: string

  @Column('varchar', { nullable: false })
  password!: string

  @Column('varchar', { nullable: true })
  name!: string
}
