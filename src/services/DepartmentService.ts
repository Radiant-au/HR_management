// services/DepartmentService.ts
import { DepartmentRepository } from '@repositories/DepartmentRepository';
import { Department } from '../entities/Department';
export class DepartmentService {

    static async getDepartmentById(departmentId: number): Promise<Department> {
        return DepartmentRepository.findOneByOrFail({ id: departmentId });
    }

    static async getAllDepartment() :Promise<Department[]>{
        return DepartmentRepository.find();
    }
}
