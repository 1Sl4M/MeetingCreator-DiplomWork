import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentDto } from '../dto/create-student.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() body: Record<string, any>) {
    const { email, password } = body;

    const item = await this.authService.signIn(email, password);

    return item;
  }

  @Post('register')
  async register(@Body() body: CreateStudentDto) {
    const item = await this.authService.registerStudent(body);

    return item;
  }
}
