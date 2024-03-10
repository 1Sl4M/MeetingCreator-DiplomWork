import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'student-form' })
export class StudentForm {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare email: string;

  @Column()
  declare course: number;

  @Column()
  declare phoneNumber: string;

  @Column()
  declare institut: string;

  @OneToOne(() => Student, (student) => student.studentForm)
  declare student: Student;
}
