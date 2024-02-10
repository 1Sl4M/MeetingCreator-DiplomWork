import { Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import { StudentsMeeting } from "../entity/student-meeting.entity";

@Injectable()
export class Excel {
	async createExcelFile(meeting: StudentsMeeting) {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('MeetingData');
	
		// Добавляем заголовки
		worksheet.addRow(['Title', 'Description', 'Date', 'Location', 'Organizer', 'StartTime', 'EndTime']);
	
		// Добавляем данные
		worksheet.addRow([
			meeting.title,
			meeting.description,
			meeting.date.toISOString().split('T')[0], // Преобразование Date в строку формата YYYY-MM-DD
			meeting.location,
			meeting.organizer,
			meeting.startTime,
			meeting.endTime,
		]);
	
		// Сохраняем файл
		await workbook.xlsx.writeFile(`meeting_${meeting.id}.xlsx`);
	}
	
	// Функция для добавления новых данных в существующий Excel файл
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