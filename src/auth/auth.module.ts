import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from '../student/student.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE, JWT_SECRET } from './auth.constants';

@Module({
  imports: [
    StudentModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
