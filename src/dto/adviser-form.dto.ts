import { IsNotEmpty } from "class-validator";

export class AdviserFormDto {
	@IsNotEmpty()
  declare name: string;

	@IsNotEmpty()
	declare email:string;

	@IsNotEmpty()
	declare affiliation: string;

	@IsNotEmpty()
  declare phoneNumber: string;
}