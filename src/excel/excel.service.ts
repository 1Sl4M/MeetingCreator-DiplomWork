import { Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { StudentsMeeting } from "../entity/student-meeting.entity";
import { StudentFormDto } from "../dto/student-form.dto";

@Injectable()
export class ExcelService {
	async createExcelFile(meeting: StudentsMeeting, studentMeeting: StudentFormDto){
		const filePath = path.resolve(__dirname, '../uploads/students', `${meeting.title}-${meeting.id}.xlsx`);
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('MeetingData');
		
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

		console.log(filePath);
		
		await workbook.xlsx.writeFile(filePath);
		//await workbook.xlsx.writeFile(`${meeting.title}-${meeting.id}.xlsx`);
	}
	
	async addToExcelFile(existingFilePath: string, studentData: any) {
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(existingFilePath);
	
		const worksheet = workbook.getWorksheet('MeetingData');
	
		// Добавляем новую строку с данными студента
		worksheet.addRow([
			studentData.name,
			studentData.email,
			studentData.course,
			studentData.phoneNumber,
			studentData.institut,
		]);
	
		// Сохраняем обновленный файл
		await workbook.xlsx.writeFile(existingFilePath);
	}
}