import { EmployeeRequestDto } from '@dtos/EmployeeDto';
import fs from 'fs';
import XLSX from 'xlsx';
import { EmployeeService } from './EmployeeService';

export class ExcelUploadService{
    
    static async processExcelFile(filePath :string , token:string): Promise<void>{
        try{
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json<EmployeeRequestDto>(sheet);

            for (const employeeData of data) {
                    await EmployeeService.createEmployee(employeeData, token); // Profile image is optional
            }
                 
            fs.unlinkSync(filePath);
        }catch(error){
            console.error('Error processing Excel file', error);
        }
    }
}