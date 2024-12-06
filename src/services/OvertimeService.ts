import { OvertimeRequestDto, OvertimeResponseDto } from "@dtos/OvertimeDto";
import { UserService } from "./UserService";
import { Overtime } from "@entities/Overtime";
import { OvertimeRepository } from "@repositories/OvertimeRepository";


export class OvertimeService {

    static async createOvertime(data: OvertimeRequestDto, token: string): Promise<OvertimeResponseDto> {
        // Fetching user from the token
        const admin = await UserService.getUserByJWT(token);

        // Create and save the shift
        const overtime = new Overtime();
        overtime.name = data.name;
        overtime.startTime = data.start_time;
        overtime.endTime = data.end_time;
        overtime.date = data.otDate;
        overtime.createdBy = admin;

        const savedOT = await OvertimeRepository.save(overtime);

        // Create response DTO
        const response: OvertimeResponseDto = {
            id: savedOT.id,
            name: savedOT.name,
            start_time: savedOT.startTime,
            end_time: savedOT.endTime,
            createdByName: savedOT.createdBy.username,
            profileImg: savedOT.createdBy.profileImg,
            date: savedOT.date,
        };

        return response;
    }

    // Edit an existing overtime
    static async editOvertime(id: number, data: OvertimeRequestDto): Promise<OvertimeResponseDto> {
        const overtime = await OvertimeRepository.findOneBy({ id });
        if (!overtime) {
            throw new Error("ovetime not found");
        }

        overtime.name = data.name || overtime.name;
        overtime.startTime = data.start_time || overtime.startTime;
        overtime.endTime = data.end_time || overtime.endTime;
        overtime.date = data.otDate || overtime.date;

        const updatedOT = await OvertimeRepository.save(overtime);

        const response: OvertimeResponseDto = {
            name: updatedOT.name,
            start_time: updatedOT.startTime,
            end_time: updatedOT.endTime,
            date: updatedOT.date,
        }

        return response;
    }

    // Soft delete a shift (mark it as deleted without removing it)
    static async softDeleteOvertime(id: number): Promise<boolean> {

        const overtime = await OvertimeRepository.findOneBy({ id });
        if (overtime) {
            await OvertimeRepository.softDelete(id);
        }
        return true;
    }

    // Get all shifts (including those that may have been soft deleted)
    static async getAllOvertime(): Promise<OvertimeResponseDto[]> {
        const allOT = await OvertimeRepository.find({ relations: ['createdBy'] });

        const response: OvertimeResponseDto[] = allOT.map((ot) => ({
            id: ot.id,
            name: ot.name,
            start_time: ot.startTime,
            end_time: ot.endTime,
            createdByName: ot.createdBy.username,
            profileImg: ot.createdBy.profileImg,
            date: ot.date,
        }));

        return response;
    }

    // static async getOvertimeById(shift_id :number): Promise<ShiftResponseDTO>{
    // }

}
