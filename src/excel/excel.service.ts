import { Injectable, NotFoundException } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';
import { StudentsMeeting } from '../entity/student-meeting.entity';
import { StudentFormDto } from '../dto/student-form.dto';
import { AdviserMeeting } from '../entity/adviser-meeting.entity';
import { AdviserFormDto } from '../dto/adviser-form.dto';

@Injectable()
export class ExcelService {

  //создание excel документа
  async createExcelFile(
    meeting: StudentsMeeting,
    studentMeeting: StudentFormDto,
  ): Promise<void> {
    const folderPath = path.resolve(
      __dirname,
      '../../../src/excel/uploads/students',
    );
    const filePath = path.resolve(
      folderPath,
      `${meeting.title}-${meeting.id}.xlsx`,
    );

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MeetingData', {
      properties: { defaultColWidth: 30 }, 
    });

    worksheet.addRow([
      'Title',
      'Description',
      'Location',
      'Date',
      'Name',
      'Email',
      'Course',
      'Phone number',
      'Institut',
    ]);

    worksheet.addRow([
      meeting.title,
      meeting.description,
      meeting.location,
      new Date(meeting.date).toISOString().split('T')[0],
      studentMeeting.name,
      studentMeeting.email,
      studentMeeting.course,
      studentMeeting.phoneNumber,
      studentMeeting.institut,
    ]);

    console.log(filePath +123456);

    try {
      await workbook.xlsx.writeFile(filePath);
      console.log(`Empty Excel file created at: ${filePath}`);
    } catch (error) {
      console.error(error);
    }
    
  }

  //редактирование excel документа
  async addToExcelFile(
    existingFilePath: string,
    meetingData: StudentsMeeting,
    studentData: any,
  ) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(existingFilePath);
    const worksheet = workbook.getWorksheet('MeetingData');

    if(!worksheet) throw new NotFoundException('Worksheet not found');

    // Добавляем новую строку с данными студента
    worksheet.addRow([
      meetingData.title,
      meetingData.description,
      meetingData.location,
      new Date(meetingData.date).toISOString().split('T')[0],
      studentData.name,
      studentData.email,
      studentData.course,
      studentData.phoneNumber,
      studentData.institut,
    ]);

    try {
      await workbook.xlsx.writeFile(existingFilePath);
    } catch (error) {
      console.error(error);
    }
  }
}
