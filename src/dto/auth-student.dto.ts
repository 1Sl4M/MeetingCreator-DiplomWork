import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthStudentDto {
  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(3)
  declare password: string;
}
