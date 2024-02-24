import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { CreateAdviserDto } from '../dto/create-adviser.dto';
import { Adviser } from '../entity/adviser.entity';
import { AdviserMeetingDto } from '../dto/adviser-meeting.dto';
import { AdviserFormDto } from '../dto/adviser-form.dto';

@Controller('adviser')
export class AdviserController {
  constructor(private readonly adviserService: AdviserService) {}

  @Post()
  async createAdviser(@Body() dto: CreateAdviserDto): Promise<Adviser> {
    return this.adviserService.createAdviser(dto);
  }

  @Post('meeting')
  async saveMeetingDate(@Body() data: AdviserMeetingDto) {
    return this.adviserService.saveMeetingDate(data);
  }

  @Post('form/:id')
  async saveAdviserDataToExcel(@Body() data: AdviserFormDto, @Param('id') id: number) {
    return this.adviserService.saveAdviserDataToExcel(data, id);
  }

  @Get()
  async getAllAdvisers(): Promise<Adviser[]> {
    return this.adviserService.getAllAdvisers();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.adviserService.getById(id);
  }

  @Get('email')
  async getEmails() {
    return this.adviserService.getEmails();
  }
}
