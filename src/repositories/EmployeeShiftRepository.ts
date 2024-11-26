import { AppDataSource } from "@config/data-source";
import { EmployeeShiftDetailsDto } from "@dtos/ShiftDto";
import { EmployeeShift } from "@entities/EmployeeShift";
import { Brackets } from "typeorm";

export const EmployeeShiftRepository = AppDataSource.getRepository(EmployeeShift).extend({
    async findWithDetails(): Promise<EmployeeShiftDetailsDto[]> {
    
        const rawData = await this.createQueryBuilder("employeeShift")
            .select([
                "employeeShift.id AS id", 
                "employee.name AS employeeName", 
                "employee.profileImg AS employeeProfileImg", 
                "shift.type AS shiftType", 
                "shift.start_time AS shiftStartTime", 
                "shift.end_time AS shiftEndTime"
            ])
            .leftJoin("employeeShift.employee", "employee", "employee.deleted_at IS NULL")
            .leftJoin("employeeShift.shift", "shift", "shift.deleted_at IS NULL")
            .where("shift.id IS NOT NULL OR employeeShift.shift_id IS NULL")
            .orderBy("employeeShift.updated_at", "DESC") 
            .getRawMany();
    
        return rawData as EmployeeShiftDetailsDto[];
    },
});
