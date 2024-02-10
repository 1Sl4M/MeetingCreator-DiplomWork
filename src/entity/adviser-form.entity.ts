import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adviser } from './adviser.entity';

@Entity({ name: 'adviser-form' })
export class AdviserForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  affiliation: string;

  @OneToOne(() => Adviser, (adviser) => adviser.adviserForm)
  adviser: Adviser;
}
