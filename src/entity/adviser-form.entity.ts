import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adviser } from './adviser.entity';

@Entity({ name: 'adviser-form' })
export class AdviserForm {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare email: string;

  @Column()
  declare phoneNumber: string;

  @Column()
  declare affiliation: string;

  @OneToOne(() => Adviser, (adviser) => adviser.adviserForm)
  declare adviser: Adviser;
}
