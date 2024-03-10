import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adviser } from './adviser.entity';

@Entity({ name: 'adviser_meeting' })
export class AdviserMeeting {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare title: string;

  @Column()
  declare description: string;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  declare date: Date;

  @Column()
  declare location: string;

  @Column()
  declare organizer: string;

  @Column()
  declare startTime: string;

  @Column()
  declare endTime: string;

  @OneToMany(() => Adviser, (adviser) => adviser.adviser_meeting)
  @JoinColumn({ name: 'adviser_id' })
  declare adviser: Adviser[];
}
