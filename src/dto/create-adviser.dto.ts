import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateAdviserDto {
  @IsString()
  @MinLength(3)
  declare name: string;

  @IsEmail()
  declare email: string;

  @IsString()
  declare affiliation: string;
}
