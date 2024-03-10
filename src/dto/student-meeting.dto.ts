import { IsNotEmpty } from 'class-validator';

export class StudentsMeetingDto {
  @IsNotEmpty()
  declare title: string;

  @IsNotEmpty()
  declare description: string;

  @IsNotEmpty()
  declare date: Date;

  @IsNotEmpty()
  declare location: string;

  @IsNotEmpty()
  declare organizer: string;

  @IsNotEmpty()
  declare startTime: string;

  @IsNotEmpty()
  declare endTime: string;
}
