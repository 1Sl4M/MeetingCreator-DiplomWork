import { IsNotEmpty } from 'class-validator';

export class StudentFormDto {
	@IsNotEmpty()
  declare name: string;

	@IsNotEmpty()
	declare email:string;

	@IsNotEmpty()
	declare course: number;

	@IsNotEmpty()
  declare phoneNumber: string;

	@IsNotEmpty()
  declare institut: string;
}