// services/DepartmentService.ts
import { DepartmentRepository } from '@repositories/DepartmentRepository';
import { Department } from '../entities/Department';

interface departmentRequest{
    name : string;
}

export class DepartmentService {

    static async getDepartmentById(departmentId: number): Promise<Department> {
        return await DepartmentRepository.findOneByOrFail({ id: departmentId });
    }

    static async getAllDepartment() :Promise<Department[]>{
        return await DepartmentRepository.find();
    }

    static async createDepartment(data : departmentRequest) :Promise<Department>{
        const department = new Department();
        department.name = data.name;

        return await DepartmentRepository.save(department);
    }   

    static async editDepartment(id: number , data : departmentRequest) :Promise<Department>{
        const department = await DepartmentRepository.findOneBy({id});
        department.name = data.name;

        return await DepartmentRepository.save(department);
    }   
}
