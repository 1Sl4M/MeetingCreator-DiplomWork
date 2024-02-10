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
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  location: string;

  @Column()
  organizer: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @OneToMany(() => Adviser, (adviser) => adviser.adviser_meeting)
  @JoinColumn({ name: 'adviser_id' })
  adviser: Adviser[];
}
