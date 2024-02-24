import { BadRequestException, Injectable } from '@nestjs/common';
import { Adviser } from '../entity/adviser.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdviserDto } from '../dto/create-adviser.dto';
import { MailService } from '../mail/mail.service';
import { AdviserMeetingDto } from '../dto/adviser-meeting.dto';
import { AdviserMeeting } from '../entity/adviser-meeting.entity';
import { AdviserForm } from '../entity/adviser-form.entity';
import * as path from 'path';
import * as fs from 'fs';
import { ExcelService } from '../excel/excel.service';

@Injectable()
export class AdviserService {
  constructor(
    @InjectRepository(Adviser)
    private readonly adviser: Repository<Adviser>,
    @InjectRepository(AdviserMeeting)
    private readonly adviserMeeting: Repository<AdviserMeeting>,
    @InjectRepository(AdviserForm)
    private readonly adviserForm: Repository<AdviserForm>,
    private readonly mailService: MailService,
    private readonly excel: ExcelService
  ) {}

  async sendMailToAdvisers(meetingInfo: any, id: number): Promise<void> {
    let i = 0;

    const adviserMails = await this.getEmails();
    const adviserNames = await this.getAllAdvisers();

    const adviserNamesMap = adviserNames.map(
      (adviserName) => adviserName.name
    );

    adviserMails.forEach(async (email) => {
      const htmlTemplate = `
				Приветствую Вас, ${adviserNamesMap[i]}!

        Приглашаем вас на собрание по теме ${meetingInfo.title}, которое пройдет ${meetingInfo.date} с подробностями -
        ${meetingInfo.description}, собрание будет проходить в ${meetingInfo.location}, организатором является 
        ${meetingInfo.organizer}. Собрание начинается в ${meetingInfo.startTime} и будет проходить до ${meetingInfo.endTime}.
        ${adviserNamesMap[i]}, Вам необходимо заполнить форму по ссылке ниже, спасибо за активность!
			
				Пожалуйста, заполните форму по http://localhost:3000/adviser-form?id=${id} ссылке.
			`;
      i++;
      await this.mailService.sendMail(email, meetingInfo.title, htmlTemplate);
    });
  }

  async saveMeetingDate(data: AdviserMeetingDto) {
    if (!data) {
      throw new BadRequestException('Invalid data');
    }

    const meetingInfo = await this.adviserMeeting.save(data);

    await this.sendMailToAdvisers(meetingInfo, meetingInfo.id);
    return meetingInfo;
  }

  async saveAdviserDataToExcel(dto: any, id: number) {
    if (!dto) {
      throw new BadRequestException('Invalid data');
    }

    const meetingData = await this.adviserMeeting.findOneBy({ id });

    await this.adviserForm.save(dto);
    
    const folderPath = path.resolve(__dirname, '../../../src/excel/uploads/adviser');
    const filePath = path.resolve(folderPath, `${meetingData.title}-${meetingData.id}.xlsx`);

    let fileExists = false;
    try {
      await fs.promises.stat(filePath);
      fileExists = true;
    } catch (error) {
      fileExists = false;
    }

    if (fileExists) {
      await this.excel.addToExcelFileAdviser(filePath, meetingData, dto);
    } else {
      await this.excel.createExcelFileAdviser(meetingData, dto);
    }
  }

  async createAdviser(dto: CreateAdviserDto): Promise<Adviser> {
    return this.adviser.save(dto);
  }

  async getById(id: number) {
    const adviser = await this.adviser.findOne({
      where: { id },
    });

    console.log(adviser);

    return adviser;
  }

  async getAllAdvisers(): Promise<Adviser[]> {
    return this.adviser.find();
  }

  async getEmails(): Promise<string[]> {
    const advisers = await this.adviser.find();
    return advisers.map((adviser) => adviser.email);
  }
}
