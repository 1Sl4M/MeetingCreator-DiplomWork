import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { StudentsMeeting } from './entity/student-meeting.entity';
import { StudentForm } from './entity/student-form';
import { MailService } from './mail/mail.service';
import { ExcelService } from './excel/excel.service';
import { StudentService } from './student/student.service';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StudentsMeetingDto } from './dto/student-meeting.dto';

describe('StudentService', () => {
  let service: StudentService;
  let repository: Repository<Student>;

  const mockStudents = [
    { id: 1, email: 'student1@example.com' },
    { id: 2, email: 'student2@example.com' },
  ];

  beforeEach(async () => {
    const studentRepositoryMock = {
      find: jest.fn().mockResolvedValue(mockStudents),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          database: process.env.POSTGRES_DATABASE,
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT) || 5432,
          username: "postgres",
          password: String(process.env.POSTGRES_PASSWORD),
          entities: [Student, StudentsMeeting, StudentForm],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Student, StudentsMeeting, StudentForm]),
      ],
      providers: [
        StudentService,
        MailService,
        ExcelService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEmails', () => {
    it('should return an array of emails', async () => {
      const emails = await service.getEmails();
      expect(emails).toBeInstanceOf(Array);
      expect(emails.length).toBeGreaterThan(0);
    });
  });

  describe('saveMeetingDate', () => {
    it('should save meeting date and send emails', async () => {
      const meetingData = {
        title: 'Test Meeting',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        organizer: 'Test Organizer',
        startTime: '10:00',
        endTime: '11:00',
      };

      const result = await service.saveMeetingDate(meetingData);
      expect(result).toBeDefined();
      // Add additional assertions as needed
    });

    it('should throw BadRequestException for invalid data', async () => {
      const meetingData :StudentsMeetingDto = {
        title: '',
        description: '',
        date: new Date, 
        location: '', 
        organizer: '', 
        startTime: '', 
        endTime: ''
      };
      await expect(service.saveMeetingDate(meetingData)).rejects.toThrow(BadRequestException);
    });
  });

  describe('saveDataToExcel', () => {
    it('should save student data to Excel', async () => {
      const studentFormDto = {
        name: 'Test Name',
        email: 'test@example.com',
        course: 4,
        institut: 'Test Institut',
        phoneNumber: '1234567890',
      };

      const id = 1;

      const result = await service.saveDataToExcel(studentFormDto, id);
      expect(result).toBeDefined();
    });

    it('should throw BadRequestException for invalid data', async () => {
      const studentFormDto = null;
      const id = 1;
      await expect(service.saveDataToExcel(studentFormDto, id)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if student meeting not found', async () => {
      const studentFormDto = {
        name: 'Test Name',
        email: 'test@example.com',
        course: 4,
        institut: 'Test Institut',
        phoneNumber: '1234567890',
      };

      const id = 999; // Assuming this ID does not exist in the mock data
      await expect(service.saveDataToExcel(studentFormDto, id)).rejects.toThrow(NotFoundException);
    });
  });
});
