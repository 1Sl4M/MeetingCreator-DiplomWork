import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'student-form' })
export class StudentForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  course: number;

  @Column()
  phoneNumber: string;

  @Column()
  institut: string;

  @OneToOne(() => Student, (student) => student.studentForm)
  student: Student;
}
