import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entity/student.entity';
import { StudentService } from './student.service';
import { StudentsMeetingDto } from '../dto/student-meeting.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() dto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(dto);
  }

  @Post('meeting')
  async saveMeetingDate(@Body() data: StudentsMeetingDto) {
    return this.studentService.saveMeetingDate(data);
  }

  // @Get('meeting/info')
  // getMeetingInfo(data any) {
  //   console.log(data);
  //   return this.studentService.getMeetingInfo(data);
  // }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get('id/:id')
  async getById(@Param('id') id: number) {
    return this.studentService.getById(id);
  }

  @Get('email')
  async getEmails() {
    return this.studentService.getEmails();
  }
}
