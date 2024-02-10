import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateAdviserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  affiliation: string;
}
