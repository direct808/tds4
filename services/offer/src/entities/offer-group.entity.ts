import { Column, Entity, OneToMany } from 'typeorm'
import { Offer } from './offer.entity'

@Entity()
export class OfferGroup {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string

  @Column()
  declare name: string

  @OneToMany(() => Offer, (offer) => offer.groupId)
  declare offers: Offer[]
}
