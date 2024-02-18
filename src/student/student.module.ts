import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { Adviser } from '../entity/adviser.entity';
import { StudentsMeeting } from '../entity/student-meeting.entity';
import { AdviserMeeting } from '../entity/adviser-meeting.entity';
import { StudentForm } from '../entity/student-form';
import { MailModule } from '../mail/mail.module';
import { AdviserModule } from '../adviser/adviser.module';
import { AdviserForm } from '../entity/adviser-form.entity';
import { ExcelService } from '../excel/excel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      StudentForm,
      AdviserForm,
      Adviser,
      StudentsMeeting,
      AdviserMeeting,
    ]),
    MailModule,
    AdviserModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, ExcelService],
  exports: [StudentService],
})
export class StudentModule {}
