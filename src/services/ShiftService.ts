import { EmployeeShiftDetailsDto, employeeShiftDTO, employeeShiftRequestDto, ShiftRequestDTO, ShiftResponseDTO } from "@dtos/ShiftDto";
import { ShiftRepository } from "@repositories/ShiftRepository";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { Shift } from "@entities/Shift";
import { EmployeeShift } from "@entities/EmployeeShift";
import { UserService } from "./UserService";
import { EmployeeShiftRepository } from "@repositories/EmployeeShiftRepository";

export class ShiftService {

    static async createShift(data: ShiftRequestDTO, token: string): Promise<ShiftResponseDTO> {
        // Fetching user from the token
        const admin = await UserService.getUserByJWT(token);

        // Create and save the shift
        const shift = new Shift();
        shift.type = data.type;   // DAY or NIGHT
        shift.start_time = data.start_time;
        shift.end_time = data.end_time;
        shift.createdBy = admin;
        shift.grace_period = data.grace_period || 15; // Default grace period to 15 minutes if not provided

        const savedShift = await ShiftRepository.save(shift);

        // Create response DTO
        const response: ShiftResponseDTO = {
            id: savedShift.id,
            type: savedShift.type,
            start_time: savedShift.start_time,
            end_time: savedShift.end_time,
            createdByName: savedShift.createdBy.username,
            profileImg: savedShift.createdBy.profileImg,
            grace_period: savedShift.grace_period,
        };

        return response;
    }

    // Edit an existing shift
    // static async editShift(shiftId: string, data: ShiftRequestDTO, token: string): Promise<ShiftResponseDTO> {
    //     const admin = await UserService.getUserByJWT(token);

    //     // Fetch the shift to update
    //     const shift = await ShiftRepository.findOne(shiftId);
    //     if (!shift) {
    //         throw new Error("Shift not found");
    //     }

    //     // Update shift fields
    //     shift.type = data.type || shift.type;
    //     shift.start_time = data.start_time || shift.start_time;
    //     shift.end_time = data.end_time || shift.end_time;
    //     shift.grace_period = data.grace_period || shift.grace_period;

    //     const updatedShift = await ShiftRepository.save(shift);

    //     // Create response DTO
    //     const response: ShiftResponseDTO = {
    //         id: updatedShift.id,
    //         type: updatedShift.type,
    //         start_time: updatedShift.start_time,
    //         end_time: updatedShift.end_time,
    //         grace_period: updatedShift.grace_period,
    //         created_at: updatedShift.created_at,
    //         updated_at: updatedShift.updated_at
    //     };

    //     return response;
    // }

    // Assign employee to a shift
    static async assignEmployeeToShift(data: employeeShiftRequestDto, shiftId: string, token: string): Promise<employeeShiftDTO> {
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

    // Soft delete a shift (mark it as deleted without removing it)
    // static async softDeleteShift(shiftId: string, token: string): Promise<boolean> {
    //     const admin = await UserService.getUserByJWT(token);

    //     // Fetch shift
    //     const shift = await ShiftRepository.findOne(shiftId);
    //     if (!shift) {
    //         throw new Error("Shift not found");
    //     }

    //     // Soft delete the shift by setting the deleted_at field
    //     shift.deleted_at = new Date();
    //     await ShiftRepository.save(shift);

    //     return true;
    // }

    // Get all shifts (including those that may have been soft deleted)
    static async getAllShifts(): Promise<ShiftResponseDTO[]> {
        const allShifts = await ShiftRepository.find({relations : ['createdBy']});

        const response: ShiftResponseDTO[] = allShifts.map((shift) => ({
            id: shift.id,
            type: shift.type,
            start_time: shift.start_time,
            end_time: shift.end_time,
            createdByName: shift.createdBy.username,
            profileImg: shift.createdBy.profileImg,
            grace_period: shift.grace_period
        }));

        return response;
    }

    static async getEmployeeByShifts() :Promise<EmployeeShiftDetailsDto[]>{
        const shiftsEmployee = await EmployeeShiftRepository.findWithDetails();

        return shiftsEmployee;
    }
}
