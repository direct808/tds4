import { Column, Entity } from 'typeorm';

@Entity()
export class AffiliateNetwork {
  @Column('uuid', { generated: 'uuid', primary: true })
  declare id: string;

  @Column()
  declare name: string;

  @Column({ nullable: true })
  declare offerParam: string;

  @Column({ nullable: true })
  declare postbackUrl: string;
}
