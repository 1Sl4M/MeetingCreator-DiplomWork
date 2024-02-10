import { IsNotEmpty } from 'class-validator';

export class AdviserMeetingDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  organizer: string;

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;
}
