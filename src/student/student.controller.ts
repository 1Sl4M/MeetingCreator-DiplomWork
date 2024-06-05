import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Student } from '../entity/student.entity';
import { StudentService } from './student.service';
import { StudentsMeetingDto } from '../dto/student-meeting.dto';
import { StudentFormDto } from '../dto/student-form.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}
  @Post('meeting')
  async saveMeetingDate(@Body() data: StudentsMeetingDto) {
    return this.studentService.saveMeetingDate(data);
  }

  @Post('form/:id')
  @UseGuards(JwtAuthGuard)
  async saveStudentDataToExcel(
    @Body() data: StudentFormDto,
    @Param('id') id: number,
  ) {
    return this.studentService.saveDataToExcel(data, id);
  }

  @Get('api/:id')
  async getAllStudentInfo(@Param('id') id: number) {
    return this.studentService.getAllStudentInfo(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: number) {
    return this.studentService.getById(id);
  }

  @Get('email')
  async getEmails() {
    return this.studentService.getEmails();
  }
}
