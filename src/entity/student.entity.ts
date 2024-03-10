import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adviser } from './adviser.entity';
import { StudentsMeeting } from './student-meeting.entity';
import { StudentForm } from './student-form';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column({ default: '' })
  declare password: string;

  @Column()
  declare email: string;

  @Column()
  declare course: number;

  @Column()
  declare address: string;

  @Column()
  declare institut: string;

  @ManyToMany(() => Adviser)
  @JoinTable({
    name: 'adviser_student',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'adviser_id',
      referencedColumnName: 'id',
    },
  })
  declare adviser: Adviser;

  @ManyToOne(
    () => StudentsMeeting,
    (student_meeting) => student_meeting.students,
  )
  @JoinColumn({ name: 'student_id' })
  declare students_meeting: StudentsMeeting;

  @OneToOne(() => StudentForm, (studentForm) => studentForm.student)
  declare studentForm: StudentForm;
}
