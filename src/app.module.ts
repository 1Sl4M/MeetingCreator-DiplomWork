import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { Adviser } from './entity/adviser.entity';
import { StudentsMeeting } from './entity/student-meeting.entity';
import { AdviserMeeting } from './entity/adviser-meeting.entity';
import { StudentModule } from './student/student.module';
import { AdviserModule } from './adviser/adviser.module';
import { StudentForm } from './entity/student-form';
import { MailModule } from './mail/mail.module';
import { AdviserForm } from './entity/adviser-form.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DATABASE,
      entities: [
        Student,
        StudentForm,
        AdviserForm,
        Adviser,
        StudentsMeeting,
        AdviserMeeting,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Student,
      StudentForm,
      AdviserForm,
      Adviser,
      StudentsMeeting,
      AdviserMeeting,
    ]),
    StudentModule,
    AdviserModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
