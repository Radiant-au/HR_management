import { AppDataSource } from "@config/data-source";
import { EmployeeOTDetailsDto } from "@dtos/OvertimeDto";
import { EmployeeOvertime } from "@entities/EmployeeOvertime";
import { raw } from "mysql2";


export const EmployeeOvertimeRepository = AppDataSource.getRepository(EmployeeOvertime).extend({
    async findWithDetails(): Promise<EmployeeOTDetailsDto[]> {
    
        const rawData = await this.createQueryBuilder("employeeOvertime")
            .select([
                "employeeOvertime.id AS id", 
                "employee.name AS employeeName", 
                "employee.profileImg AS employeeProfileImg", 
                "overtime.name AS OTname", 
                "overtime.startTime AS OTStartTime", 
                "overtime.endTime AS OTEndTime",
                "DATE_FORMAT(overtime.date, '%Y-%m-%d') AS OTDate"
            ])
            .leftJoin("employeeOvertime.employee", "employee", "employee.deleted_at IS NULL")
            .leftJoin("employeeOvertime.overtime", "overtime", "overtime.deleted_at IS NULL")
            .where("overtime.id IS NOT NULL OR employeeOvertime.overtimeId IS NULL")
            .orderBy("employeeOvertime.updated_at", "DESC") 
            .getRawMany();
    
        return rawData as EmployeeOTDetailsDto[];
    },
});
