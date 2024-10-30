
import { Einformation } from "@entities/Einformation";
import { EmployeeRequestDto, EmployeeResponseDto } from "src/dto/EmployeeDto";
import { UserService } from "./UserService";
import { Employee } from "@entities/Employee";
import { DepartmentService } from "./DepartmentService";
import { EinfoService } from "./EinfoService";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { EinformationRepository } from "@repositories/Einformation";



export class EmployeeService {
        
    static async createEmployee(data: EmployeeRequestDto, token: string): Promise<EmployeeResponseDto> {
        
        const einformation: Einformation = await EinfoService.createInformation({
            degreeOrCertificate: data.degree,
            experience: data.experience
        });

        const employee = new Employee();
        employee.phNo = data.phNo;
        employee.name = data.name;
        employee.CurrentAddress = data.CurrentAddress;
        employee.PermanentAddress = data.PermanentAddress;
        employee.position = data.position;
        employee.department = await DepartmentService.getDepartmentById(data.departmentId);
        employee.created_by = await UserService.getUserByJWT(token);
        employee.education = einformation;

        const savedEmployee = await EmployeeRepository.save(employee);

        const response: EmployeeResponseDto = {
            id: savedEmployee.id,
            name: savedEmployee.name,
            phNo: savedEmployee.phNo,
            CurrentAddress: savedEmployee.CurrentAddress,
            PermanentAddress: savedEmployee.PermanentAddress,
            departmentName: savedEmployee.department?.name,
            einformationId: {degree : savedEmployee.education.degreeOrCertificate , experience : savedEmployee.education.experience},
            position: savedEmployee.position,
            createdById: { username: savedEmployee.created_by.username, profileImg: savedEmployee.created_by.profileImg }
        };

        return response;
    }

    static async getAllEmployee(): Promise<EmployeeResponseDto[]>{
        const allEmployees = await EmployeeRepository.find({
            relations: ['created_by', 'department', 'education']
        });

        const response: EmployeeResponseDto[] = 
            allEmployees.map((data) => ({
                id: data.id,
                name: data.name,
                phNo: data.phNo,
                CurrentAddress: data.CurrentAddress,
                PermanentAddress: data.PermanentAddress,
                departmentName: data.department?.name,  // Get department name if available
                einformationId: {degree : data.education.degreeOrCertificate , experience : data.education.experience},
                position: data.position,
                createdById: {
                    username: data.created_by.username,
                    profileImg: data.created_by.profileImg
                }
            }));

        return response;
    }

    static async updateEmployee(id: number , data: EmployeeRequestDto): Promise<EmployeeResponseDto> {

        const employee = await EmployeeRepository.findOne({
            where: { id },
            relations: ['created_by', 'department', 'education']
        });

        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }

        employee.phNo = data.phNo;
        employee.name = data.name;
        employee.CurrentAddress = data.CurrentAddress;
        employee.PermanentAddress = data.PermanentAddress;
        employee.position = data.position;

        employee.department = data.departmentId ? await DepartmentService.getDepartmentById(data.departmentId) : employee.department;

        const einformation = await EinfoService.updateInformation(employee.education.id ,{
            degreeOrCertificate: data.degree,
            experience: data.experience
        });
        employee.education = einformation;


        const savedEmployee = await EmployeeRepository.save(employee);
        console.log(savedEmployee)

        const response: EmployeeResponseDto = {
            id: savedEmployee.id,
            name: savedEmployee.name,
            phNo: savedEmployee.phNo,
            CurrentAddress: savedEmployee.CurrentAddress,
            PermanentAddress: savedEmployee.PermanentAddress,
            departmentName: savedEmployee.department?.name,
            einformationId: {degree : savedEmployee.education.degreeOrCertificate , experience : savedEmployee.education.experience},
            position: savedEmployee.position,
            createdById: { username: savedEmployee.created_by.username, profileImg: savedEmployee.created_by.profileImg }
        };

        return response;
    }

    static async getEmployeeById(id: number){
        const employee = await EmployeeRepository.findOne({
            where: { id },
            relations: ['created_by', 'department', 'education']
        });

        const response: EmployeeResponseDto = {
            id: employee.id,
            name: employee.name,
            phNo: employee.phNo,
            CurrentAddress: employee.CurrentAddress,
            PermanentAddress: employee.PermanentAddress,
            departmentName: employee.department?.name,
            einformationId: {degree : employee.education.degreeOrCertificate , experience : employee.education.experience},
            position: employee.position,
            createdById: { username: employee.created_by.username, profileImg: employee.created_by.profileImg }
        };

        return response;
    }
    
    static async deleteEmployee(id : number){
        const employee = await EmployeeRepository.findOne({
            where: { id },
            relations: ['created_by', 'department', 'education']
        });
        if(employee){
            await EinformationRepository.delete(employee.education.id);
        }
        return await EmployeeRepository.delete(id);
    }
}
