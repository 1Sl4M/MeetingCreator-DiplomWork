import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../src/student/student.controller';
import { StudentService } from '../src/student/student.service';
import { StudentFormDto } from '../src/dto/student-form.dto';
import { StudentsMeetingDto } from '../src/dto/student-meeting.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save meeting date', async () => {
    const meetingData: StudentsMeetingDto = {
      title: 'Test Meeting',
      description: 'Test Description',
      date: new Date(),
      location: 'Test Location',
      organizer: 'Test Organizer',
      startTime: '10:00',
      endTime: '11:00',
    };

    jest.spyOn(service, 'saveMeetingDate').mockResolvedValue(meetingData);

    const result = await controller.saveMeetingDate(meetingData);

    expect(result).toEqual(meetingData);
  });

  it('should save student data to Excel', async () => {
    const studentFormDto: StudentFormDto = {
      name: 'Test Name',
      email: 'test@example.com',
      course: 4,
      institut: 'Test Institut',
      phoneNumber: '1234567890',
    };

    const id = 1;

    jest.spyOn(service, 'saveStudentDataToExcel').mockResolvedValue(studentFormDto);

    const result = await controller.saveStudentDataToExcel(studentFormDto, id);

    expect(result).toEqual(studentFormDto);
  });

  it('should get all student info', async () => {
    const studentId = 1;
    const studentInfo = {}; // Mock student info

    jest.spyOn(service, 'getAllStudentInfo').mockResolvedValue(studentInfo);

    const result = await controller.getAllStudentInfo(studentId);

    expect(result).toEqual(studentInfo);
  });
});
