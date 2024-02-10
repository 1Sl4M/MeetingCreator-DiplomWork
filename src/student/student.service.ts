import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentsMeeting } from '../entity/student-meeting.entity';
import { StudentsMeetingDto } from '../dto/student-meeting.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly student: Repository<Student>,
    @InjectRepository(StudentsMeeting)
    private readonly studentMeeting: Repository<StudentsMeeting>,
    private readonly mailService: MailService,
  ) {}

  async createStudent(dto: CreateStudentDto): Promise<Student> {
    return this.student.save(dto);
  }

  async sendMailToStudents(meetingInfo: any): Promise<void> {
    let i = 0;

    const studentMails = await this.getEmails();
    const studentNames = await this.getAllStudents();

    const studentNamesMap = studentNames.map(
      (studentName) => studentName.name
    );

    studentMails.forEach(async (email) => {
      const htmlTemplate = `
				Приветствую Вас, ${studentNamesMap[i]}!

        Приглашаем вас на собрание по теме ${meetingInfo.title}, которое пройдет ${meetingInfo.date} с подробностями -
        ${meetingInfo.description}, собрание будет проходить в ${meetingInfo.location}, организатором является 
        ${meetingInfo.organizer}. Собрание начинается в ${meetingInfo.startTime} и будет проходить до ${meetingInfo.endTime}.
        ${studentNamesMap[i]}, Вам необходимо заполнить форму по ссылке ниже, спасибо за активность!
			
				Пожалуйста, заполните форму по http://localhost:3000/student-form" ссылке.
			`;
      i++;
      await this.mailService.sendMail(email, meetingInfo.title, htmlTemplate);
    });
  }

  async saveMeetingDate(data: StudentsMeetingDto) {
    if (!data) {
      throw new BadRequestException('Invalid data');
    }

    const meetingInfo = await this.studentMeeting.save(data);

    await this.sendMailToStudents(meetingInfo);
    return meetingInfo;
  }

  // async getMeetingInfo(data: any) {
  //   const meetingInfo = await this.studentMeeting.findOneBy({ id: data.id });

  //   console.log(meetingInfo);

  //   return meetingInfo;
  // }

  async getAllStudents(): Promise<Student[]> {
    return this.student.find({
      relations: ['adviser'],
    });
  }

  async getById(id: number) {
    const student = await this.student.findOne({
      where: { id },
      relations: ['adviser'],
    });

    console.log(student);

    return student;
  }

  async getEmails(): Promise<string[]> {
    const students = await this.student.find();
    return students.map((student) => student.email);
  }
}
