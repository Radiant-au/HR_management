import { employeeShiftDTO, employeeShiftRequestDto } from "@dtos/ShiftDto";
import { UserService } from "./UserService";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { ShiftRepository } from "@repositories/ShiftRepository";
import { EmployeeShift } from "@entities/EmployeeShift";
import { EmployeeShiftRepository } from "@repositories/EmployeeShiftRepository";
import { EmployeeScroll } from "@dtos/EmployeeDto";
import { In, Not } from "typeorm";

export class EmpShiftService {

    static async assignEmployeeToShift(data: employeeShiftRequestDto, shiftId: number, token: string): Promise<employeeShiftDTO> {
        const admin = await UserService.getUserByJWT(token);

        // Fetch employee and shift
        const employee = await EmployeeRepository.findOne({where: {  id : data.id }});
        const shift = await ShiftRepository.findOne({where : {id : shiftId}});

        if (!employee || !shift) {
            throw new Error("Employee or Shift not found");
        }

        // Create EmployeeShift record to assign the employee to the shift
        const employeeShift = new EmployeeShift();
        employeeShift.employee = employee;
        employeeShift.shift = shift;
        employeeShift.createdBy = admin;

        const assignedShift = await EmployeeShiftRepository.save(employeeShift);

        // Prepare and return response
        const response: employeeShiftDTO = {
            type: assignedShift.shift.type,
            start_time: assignedShift.shift.start_time,
            end_time: assignedShift.shift.end_time,
            createdByName: assignedShift.createdBy.username,
            employeName: assignedShift.employee.name
        };

        return response;
    }

    static async getEmployeeByShifts(){
            const shifts = await EmployeeShiftRepository.findWithDetails();

            return shifts;
    }

    static async getUnassignedEmployees(): Promise<EmployeeScroll[]> {

        const assignedEmployeeIds = await EmployeeShiftRepository.createQueryBuilder('empShift')
                        .innerJoin('empShift.shift', 'shift') // Join with Shift table
                        .select('empShift.employee.id', 'employeeId')
                        .distinct(true)
                        .where('shift.deleted_at IS NULL') // Exclude soft-deleted shifts
                        .getRawMany();
    
        const unassignedEmployees = await EmployeeRepository.find({
            where: {
                id: Not(In(assignedEmployeeIds.map(row => row.employeeId))),
            },
            select: ['id', 'name', 'profileImg'],
        });
    
        return unassignedEmployees.map(employee => ({
            id: employee.id,
            name: employee.name,
            profileImg: employee.profileImg,
        }));
    }
    
    static async deleteEmpShift(id: number) {
        await EmployeeShiftRepository.delete(id);
        return "successfully emp_shift with id " + id;
    }
}
