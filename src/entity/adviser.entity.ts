import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { AdviserMeeting } from './adviser-meeting.entity';
import { AdviserForm } from './adviser-form.entity';

@Entity({ name: 'adviser' })
export class Adviser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  affiliation: string;

  @ManyToMany(() => Student, (student) => student.adviser)
  students: Student[];

  @ManyToOne(() => AdviserMeeting, (adviser_meeting) => adviser_meeting.adviser)
  @JoinColumn({ name: 'adviser_id' })
  adviser_meeting: AdviserMeeting;

  @OneToOne(() => AdviserForm, (adviserForm) => adviserForm.adviser)
  adviserForm: AdviserForm;
}
