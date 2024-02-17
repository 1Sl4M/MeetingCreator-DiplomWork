import { IsNotEmpty } from 'class-validator';

export class StudentFormDto {
	@IsNotEmpty()
  name: string;

	@IsNotEmpty()
	email:string;

	@IsNotEmpty()
	course: number;

	@IsNotEmpty()
  phoneNumber: string;

	@IsNotEmpty()
  institut: string;
}