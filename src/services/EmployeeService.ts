import { UserService } from "./UserService";
import { Employee } from "@entities/Employee";
import { DepartmentService } from "./DepartmentService";
import { EinfoService } from "./EinfoService";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { EinformationRepository } from "@repositories/Einformation";
import { EmployeeRequestDto, EmployeeResponseDto, EmployeeScroll } from "@dtos/EmployeeDto";
import { Einformation } from "@entities/Einformation";
import path from "path";
import fs from "fs";
import { UserRepository } from "@repositories/UserRepository";
import { AppDataSource } from "@config/data-source";
import { Department } from "@entities/Department";
import { Role } from "@entities/Role";
import { User } from "@entities/User";
import { Position } from "@entities/Position";
import { PositionService } from "./PositionService";




export class EmployeeService {
        
    static async createEmployee(data: EmployeeRequestDto, token: string, profileImage?: string): Promise<string> {
        return await AppDataSource.transaction(async (transactionalEntityManager) => {
            try {
                // Check if email already exists in User table
                if (data.email) {
                    const existingEmployee = await transactionalEntityManager.findOne(Employee, { where: { email: data.email } });
                    if (existingEmployee) {
                        throw new Error("An employee with this email already exists.");
                    }
                }
    
                // Step 1: Create Einformation
                const einformation = await transactionalEntityManager.save(Einformation, {
                    degreeOrCertificate: data.degree,
                    experience: data.experience,
                });
    
                // Step 2: Set up Employee entity
                const department = await transactionalEntityManager.findOne(Department, { where: { id: data.departmentId } });
                if (!department) throw new Error("Invalid department ID.");

                const position = await transactionalEntityManager.findOne(Position , {where: {id: data.positionId}});
                if(!position) throw new Error("Invalid position ID.");
    
                const employee = new Employee();
                employee.phNo = data.phNo;
                employee.name = data.name;
                employee.CurrentAddress = data.CurrentAddress;
                employee.PermanentAddress = data.PermanentAddress;
                employee.position =  position;
                employee.department = department;
                employee.education = einformation;
                employee.profileImg = profileImage || null;
                employee.email = data.email || null;
    
                // Step 3: Create associated User entity
                const role = await transactionalEntityManager.findOne(Role, { where: { id: 3 } });
                if (!role) throw new Error("Role not found.");
    
                const user = await transactionalEntityManager.save(User, {
                    role: role,
                    username: data.name,
                    ...(data.email && { email: data.email })
                });
    
                employee.userId = user;
    
                // Step 4: Save Employee entity
                await transactionalEntityManager.save(Employee, employee);
    
                return "success";
            } catch (error) {
                console.error("Transaction failed:", error);
                throw error; // Roll back the transaction
            }
        });
    }

    static async getAllEmployee(): Promise<EmployeeResponseDto[]>{
        const allEmployees = await EmployeeRepository.find({
            relations: ['userId.role' , 'department' , "position"],
            order: {
                updated_at: 'DESC',  // Sort by updatedAt in descending order (optional)
            }
        });


        const response: EmployeeResponseDto[] = 
            allEmployees.map((data) => ({
                id: data.id,
                name: data.name,
                email: data.email,
                profileImg: data.profileImg,
                phNo: data.phNo,
                CurrentAddress: data.CurrentAddress,
                PermanentAddress: data.PermanentAddress,
                departmentName: data.department?.name,  // Get department name if available
                position: data.position.name,
                role: data.userId.role.name
            }));

        return response;
    }

    static async updateEmployee(Eid: string , data: EmployeeRequestDto , profileImage?: string): Promise<EmployeeResponseDto> {

        const employee = await EmployeeRepository.findOne({
            where: { id : Eid},
            relations: ['department', 'education' , 'position']
        });


        if(profileImage){
            if(employee.profileImg){
                const oldImgPath = path.join(__dirname, "../../uploads" , employee.profileImg);
                if (fs.existsSync(oldImgPath)) {
                    fs.unlinkSync(oldImgPath); 
                }
            }
            employee.profileImg = profileImage;
        }

        employee.phNo = data.phNo;
        employee.name = data.name;
        employee.CurrentAddress = data.CurrentAddress;
        employee.PermanentAddress = data.PermanentAddress;
        employee.position = data.positionId ? await PositionService.getPositionById(data.positionId) : employee.position;

        employee.department = data.departmentId ? await DepartmentService.getDepartmentById(data.departmentId) : employee.department;

        const einformation = await EinfoService.updateInformation(employee.education.id ,{
            degreeOrCertificate: data.degree,
            experience: data.experience
        });
        employee.education = einformation;


        const savedEmployee = await EmployeeRepository.save(employee);

        const response: EmployeeResponseDto = {
            id: savedEmployee.id,
            name: savedEmployee.name,
            email: savedEmployee.email,
            profileImg: savedEmployee.profileImg,
            phNo: savedEmployee.phNo,
            CurrentAddress: savedEmployee.CurrentAddress,
            PermanentAddress: savedEmployee.PermanentAddress,
            departmentName: savedEmployee.department?.name,
            einformationId: {degree : savedEmployee.education.degreeOrCertificate , experience : savedEmployee.education.experience},
            position: savedEmployee.position.name,
            role: savedEmployee.userId?.role.name
        };

        return response;
    }

    static async getEmployeeById(id: string): Promise<EmployeeResponseDto>{
        const employee = await EmployeeRepository.findOne({
            where: { id },
            relations: ['userId.role' , 'department', 'education' , 'position']
        });

        const response: EmployeeResponseDto = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            profileImg: employee.profileImg,
            phNo: employee.phNo,
            CurrentAddress: employee.CurrentAddress,
            PermanentAddress: employee.PermanentAddress,
            departmentName: employee.department?.id,
            einformationId: {degree : employee.education.degreeOrCertificate , experience : employee.education.experience},
            position: employee.position?.id,
            role: employee.userId.role.name
        };

        return response;
    }
    
    static async deleteEmployee(id: string) {
        // Fetch the employee with all required relations
        const employee = await EmployeeRepository.findOne({
            where: { id },
            relations: ['userId', 'department', 'education'],
        });
    
        if (!employee) {
            throw new Error("Employee not found.");
        }
    
        // Soft delete related Einformation entity (if applicable)
        if (employee.education) {
            await EinformationRepository.softDelete(employee.education.id);
        }
    
        // Soft delete related User entity (if applicable)
        if (employee.userId) {
            await UserRepository.softDelete(employee.userId.id);
        }
    
        // Soft delete the Employee entity
        await EmployeeRepository.softDelete(id);
    
        return { message: "Employee soft deleted successfully." };
    }
    
}
