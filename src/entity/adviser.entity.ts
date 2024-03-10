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
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare email: string;

  @Column()
  declare affiliation: string;

  @ManyToMany(() => Student, (student) => student.adviser)
  declare students: Student[];

  @ManyToOne(() => AdviserMeeting, (adviser_meeting) => adviser_meeting.adviser)
  @JoinColumn({ name: 'adviser_id' })
  declare adviser_meeting: AdviserMeeting;

  @OneToOne(() => AdviserForm, (adviserForm) => adviserForm.adviser)
  declare adviserForm: AdviserForm;
}
