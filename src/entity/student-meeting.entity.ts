import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'student_meeting' })
export class StudentsMeeting {
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

  @OneToMany(() => Student, (students) => students.students_meeting)
  @JoinColumn({ name: 'id' })
  students: Student[];
}
