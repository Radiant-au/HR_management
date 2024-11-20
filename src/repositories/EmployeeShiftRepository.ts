import { AppDataSource } from "@config/data-source";
import { EmployeeShiftDetailsDto } from "@dtos/ShiftDto";
import { EmployeeShift } from "@entities/EmployeeShift";

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
        .leftJoin("employeeShift.employee", "employee")
        .leftJoin("employeeShift.shift", "shift")
        .getRawMany();

    return rawData as EmployeeShiftDetailsDto[];

    }
    
});
