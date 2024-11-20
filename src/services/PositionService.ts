// services/DepartmentService.ts
import { Position } from '@entities/Position';
import { PositionRepository } from '@repositories/PositionRepository';


export class PositionService {

    static async getPositionById(position_id: number): Promise<Position> {
        return PositionRepository.findOneByOrFail({ id: position_id });
    }

    static async getAllPosition() :Promise<Position[]>{
        return PositionRepository.find();
    }
}
