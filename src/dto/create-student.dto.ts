import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  course: number;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(3)
  institut: string;
}
