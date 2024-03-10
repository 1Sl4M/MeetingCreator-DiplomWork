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

  @OneToMany(() => Student, (students) => students.students_meeting)
  @JoinColumn({ name: 'id' })
  declare students: Student[];
}
