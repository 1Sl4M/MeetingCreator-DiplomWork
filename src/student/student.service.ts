import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { StudentForm } from '../entity/student-form';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentsMeeting } from '../entity/student-meeting.entity';
import { StudentsMeetingDto } from '../dto/student-meeting.dto';
import { MailService } from '../mail/mail.service';
import { ExcelService } from '../excel/excel.service';
import { StudentFormDto } from '../dto/student-form.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly student: Repository<Student>,
    @InjectRepository(StudentsMeeting)
    private readonly studentMeeting: Repository<StudentsMeeting>,
    @InjectRepository(StudentForm)
    private readonly studentForm: Repository<StudentForm>,
    private readonly mailService: MailService,
    private readonly excel: ExcelService,
    //private readonly authService: AuthService
  ) {}

  // отправление приглашения на почту
  async sendMailToUsers(meetingInfo: any, id: number): Promise<void> {
    let i = 0;

    const studentMails = await this.getEmails();

    studentMails.forEach(async (email) => {
      const htmlTemplate = `
				Приветствую Вас!

        Приглашаем вас на собрание по теме ${meetingInfo.title}, которое пройдет ${meetingInfo.date} с подробностями -
        ${meetingInfo.description}, собрание будет проходить в ${meetingInfo.location}, организатором является 
        ${meetingInfo.organizer}. Собрание начинается в ${meetingInfo.startTime} и будет проходить до ${meetingInfo.endTime}.
        Вам необходимо заполнить форму по ссылке ниже, спасибо за активность!
			
				Пожалуйста, заполните форму по http://localhost:3000/student-form?id=${id} ссылке.
			`;
      i++;
      await this.mailService.sendMail(email, meetingInfo.title, htmlTemplate);
    });
  }

  // сохранение в данных о собрании бд
  async saveMeetingDate(data: StudentsMeetingDto) {
    if (!data) {
      throw new BadRequestException('Invalid data');
    }

    const meetingInfo = await this.studentMeeting.save(data);

    await this.sendMailToUsers(meetingInfo, meetingInfo.id);
    return meetingInfo;
  }

  //сохранение информации о собрании в excel
  async saveDataToExcel(dto: any, id: number) {
    if (!dto) {
      throw new BadRequestException('Invalid data');
    }

    const studentMeeting = await this.studentMeeting.findOneBy({ id });

    if (!studentMeeting) {
      throw new NotFoundException('Student meeting not found');
    }

    await this.studentForm.save(dto);

    const folderPath = path.resolve(
      __dirname,
      '../../../src/excel/uploads',
    );
    const filePath = path.resolve(
      folderPath,
      `${studentMeeting.title}-${studentMeeting.id}.xlsx`,
    );

    let fileExists = false;
    try {
      await fs.promises.stat(filePath);
      fileExists = true;
    } catch (error) {
      fileExists = false;
    }

    if (fileExists) {
      await this.excel.addToExcelFile(filePath, studentMeeting, dto);
    } else {
      await this.excel.createExcelFile(studentMeeting, dto);
    }
  }

  //создание студента
  async createStudent(data: CreateStudentDto) {
    const student = await this.student.save(data);

    return student;
  }

  //поиск по email
  async findOneByEmail(email: string): Promise<Student> {
    const item = await this.student.findOne({ where: { email: email } });

    if (!item) {
      throw new NotFoundException('Student not found');
    }

    return item;
  }

  //получение всей информации о конкретном студенте
  async getAllStudentInfo(studentId: number) {
    const query = `
select student.id, student.name, student.email, student.course, student.address, student.institut, student_meeting.title as meetingTitle, 
student_meeting.description as meetingDescription, student_meeting.date as meetingDate, student_meeting.location as meetingLocation,
student_meeting.organizer as meetingOrganizer
from student
join student_meeting on student_meeting.id = student.id
where student.id = ${studentId} 
`;

    const st = await this.student.query(query); 
    const studentInfo = st[0]; // Получаем первый элемент массива

    return studentInfo;
  }

  //получение всех студентов
  async getAllStudents(): Promise<Student[]> {
    return this.student.find({
      relations: ['adviser'],
    });
  }

  //получение студента по айди
  async getById(id: number) {
    const student = await this.student.findOne({
      where: { id },
      relations: ['adviser'],
    });

    console.log(student);

    return student;
  }

  //получение всех почт
  async getEmails(): Promise<string[]> {
    const students = await this.student.find();
    return students.map((student) => student.email);
  }
}
