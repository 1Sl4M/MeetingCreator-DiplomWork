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
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  course: number;

  @Column()
  address: string;

  @Column()
  institut: string;

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
  adviser: Adviser;

  @ManyToOne(
    () => StudentsMeeting,
    (student_meeting) => student_meeting.students,
  )
  @JoinColumn({ name: 'student_id' })
  students_meeting: StudentsMeeting;

  @OneToOne(() => StudentForm, (studentForm) => studentForm.student)
  studentForm: StudentForm;
}
