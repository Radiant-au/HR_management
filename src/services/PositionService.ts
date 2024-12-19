// services/DepartmentService.ts
import { Position } from '@entities/Position';
import { PositionRepository } from '@repositories/PositionRepository';

interface positionRequest{
    name : string;
}

export class PositionService {

    static async getPositionById(position_id: number): Promise<Position> {
        return await PositionRepository.findOneByOrFail({ id: position_id });
    }

    static async getAllPosition() :Promise<Position[]>{
        return await PositionRepository.find();
    }

    static async createPosition(data : positionRequest) :Promise<Position>{
        const position = new Position();
        position.name = data.name;

        return await PositionRepository.save(position);
    }   

    static async editPosition(id: number , data : positionRequest) :Promise<Position>{
        const position = await PositionRepository.findOneBy({id});
        position.name = data.name;

        return await PositionRepository.save(position);
    }
}
