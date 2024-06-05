import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entity/student.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
  ) {}

  //авторизация
  async signIn(email: string, password: string): Promise<any> {
    const student = await this.studentService.findOneByEmail(email);

    if(!student) throw new UnauthorizedException(`Student not found`);

    const isPasswordValid = await compare(password, student.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: student.id };

    const result = {
      access_token: await this.jwtService.signAsync(payload),
    }

    return result;
  }

  //регистрация
  async registerStudent(dto: CreateStudentDto) {
    const salt = 10;
    const { password, ...rest } = dto;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = {
      name: rest.name,
      email: rest.email,
      password: hashedPassword,
      course: rest.course,
      address: rest.address,
      institut: rest.institut,
    }

    const item = await this.studentService.createStudent(newStudent);

    const payload = { id: item.id };

    const result = {
      access_token: await this.jwtService.signAsync(payload)
    }

    return result;
  }
}
