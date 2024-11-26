import {  ShiftRequestDTO, ShiftResponseDTO } from "@dtos/ShiftDto";
import { ShiftRepository } from "@repositories/ShiftRepository";
import { Shift } from "@entities/Shift";
import { UserService } from "./UserService";


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
    static async editShift(shiftId: number, data: ShiftRequestDTO): Promise<ShiftResponseDTO> {

        // Fetch the shift to update
        const shift = await ShiftRepository.findOne({where : {id : shiftId}});
        if (!shift) {
            throw new Error("Shift not found");
        }

        // Update shift fields
        shift.type = data.type || shift.type;
        shift.start_time = data.start_time || shift.start_time;
        shift.end_time = data.end_time || shift.end_time;
        shift.grace_period = data.grace_period || shift.grace_period;

        const updatedShift = await ShiftRepository.save(shift);

        // Create response DTO
        const response: ShiftResponseDTO = {
            type: updatedShift.type,
            start_time: updatedShift.start_time,
            end_time: updatedShift.end_time,
            grace_period: updatedShift.grace_period 
        };

        return response;
    }

    // Soft delete a shift (mark it as deleted without removing it)
    static async softDeleteShift(shiftId: number): Promise<boolean> {
        // Fetch shift
        const shift = await ShiftRepository.findOne({where : {id : shiftId}});
        if (shift) {
            await ShiftRepository.softDelete(shiftId);
        }

        return true;
    }

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

    static async getShiftById(shift_id :number): Promise<ShiftResponseDTO>{
        const shift = await ShiftRepository.findOne({where : {id : shift_id}});
        const res : ShiftResponseDTO = {
            id: shift.id,
            type: shift.type,
            start_time: shift.start_time,
            end_time: shift.end_time,
            grace_period: shift.grace_period 
        }

        return res;
    }

}
