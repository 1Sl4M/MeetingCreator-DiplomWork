import { Module, forwardRef } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { AdviserController } from './adviser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { Adviser } from '../entity/adviser.entity';
import { StudentsMeeting } from '../entity/student-meeting.entity';
import { AdviserMeeting } from '../entity/adviser-meeting.entity';
import { StudentForm } from '../entity/student-form';
import { MailModule } from '../mail/mail.module';
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
  ],
  providers: [AdviserService, ExcelService],
  controllers: [AdviserController],
  exports: [AdviserService],
})
export class AdviserModule {}
