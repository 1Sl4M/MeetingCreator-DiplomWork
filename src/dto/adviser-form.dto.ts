import { IsNotEmpty } from "class-validator";

export class AdviserFormDto {
	@IsNotEmpty()
  name: string;

	@IsNotEmpty()
	email:string;

	@IsNotEmpty()
	affiliation: string;

	@IsNotEmpty()
  phoneNumber: string;
}