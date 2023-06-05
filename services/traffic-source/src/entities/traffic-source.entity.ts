import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'
import { dateTransformer } from '@tds/common'

@Entity()
export class TrafficSource {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @Column()
  declare acceptParameters: boolean

  @Column()
  declare trafficLoss: number

  @Column('text', { array: true })
  declare postbackStatuses: string[]

  @Column('jsonb')
  declare parameters: string

  @CreateDateColumn({ transformer: dateTransformer })
  declare createdAt: string

  @UpdateDateColumn({ transformer: dateTransformer })
  declare updatedAt: string
}
