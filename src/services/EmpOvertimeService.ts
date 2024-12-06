import { employeeOTRequestDto, employeeOTtDTO } from "@dtos/OvertimeDto";
import { EmployeeOvertimeRepository } from "@repositories/EmployeeOvertimeRepository";
import { UserService } from "./UserService";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { OvertimeRepository } from "@repositories/OvertimeRepository";
import { EmployeeOvertime } from "@entities/EmployeeOvertime";
import { EmployeeScroll } from "@dtos/EmployeeDto";
import { In, Not } from "typeorm";

export class EmpOvertimeService {

    static async assignEmployeeToShift(data: employeeOTRequestDto, OTid: number, token: string): Promise<employeeOTtDTO> {
        const admin = await UserService.getUserByJWT(token);

        // Fetch employee and shift
        const employee = await EmployeeRepository.findOne({where: {  id : data.id }});
        const overtime = await OvertimeRepository.findOne({where : {id : OTid}});

        if (!employee || !overtime) {
            throw new Error("Employee or Shift not found");
        }

        // Create EmployeeShift record to assign the employee to the shift
        const employee_overtime = new EmployeeOvertime();
        employee_overtime.employee = employee;
        employee_overtime.overtime = overtime;
        employee_overtime.assignedBy = admin;

        const assignedOT = await EmployeeOvertimeRepository.save(employee_overtime);

        // Prepare and return response
        const response: employeeOTtDTO = {
            name: assignedOT.overtime.name,
            start_time: assignedOT.overtime.startTime,
            end_time: assignedOT.overtime.endTime,
            createdByName: assignedOT.assignedBy.username,
            employeName: assignedOT.employee.name
        };

        return response;
    }

    static async getEmployeeByOvertime(){
            const ots = await EmployeeOvertimeRepository.findWithDetails();

            return ots;
    }

    static async getUnassignedEmployees(overtimeId: number): Promise<EmployeeScroll[]> {
        // Fetch employee IDs already assigned to the specified overtime
        const assignedEmployeeIds = await EmployeeOvertimeRepository.createQueryBuilder('empOT')
            .innerJoin('empOT.overtime', 'overtime') // Join with Overtime table
            .select('empOT.employee.id', 'employeeId') // Select assigned employee IDs
            .distinct(true)
            .where('empOT.overtime.id = :overtimeId', { overtimeId }) // Filter by specific overtime
            .andWhere('overtime.deleted_at IS NULL') // Exclude soft-deleted overtimes
            .getRawMany();
    
        // Fetch unassigned employees
        const unassignedEmployees = await EmployeeRepository.find({
            where: {
                id: Not(In(assignedEmployeeIds.map(row => row.employeeId))), // Exclude assigned employee IDs
            },
            select: ['id', 'name', 'profileImg'], // Select relevant fields
        });
    
        // Map to the EmployeeScroll format
        return unassignedEmployees.map(employee => ({
            id: employee.id,
            name: employee.name,
            profileImg: employee.profileImg,
        }));
    }
       
    static async deleteEmpOvertime(id: number) {
        await EmployeeOvertimeRepository.delete(id);
        return "successfully emp_shift with id " + id;
    }
}