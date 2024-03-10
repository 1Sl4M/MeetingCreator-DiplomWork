import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(3)
  declare name: string;

  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(3)
  declare password: string;

  @IsNumber()
  declare course: number;

  @IsString()
  @MinLength(5)
  declare address: string;

  @IsString()
  @MinLength(3)
  declare institut: string;
}
