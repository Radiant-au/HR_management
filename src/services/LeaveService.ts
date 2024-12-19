import { AllLeaveTableResponseDTO, LeaveRequestDTO, LeaveResponseDTO, LeaveTableResponseDTO } from "@dtos/LeaveDto";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { LeavePolicyRepository } from "@repositories/LeavePolicyRepository";
import { LeaveRepository } from "@repositories/LeaveRepository";
import { LeaveBalanceRepository } from "@repositories/LeaveBalanceRepository";
import { Leave } from "@entities/Leave";
import { UserService } from "./UserService";
import { Not } from "typeorm";


export class LeaveService{
    
    static async createLeave(data: LeaveRequestDTO): Promise<LeaveResponseDTO> {
        const employee = await EmployeeRepository.findOneBy({ id: data.employeeId });
    
        if (!employee) {
            throw new Error("Employee not found");
        }
    
        const policy = await LeavePolicyRepository.findOneBy({ id: data.policyId });
    
        if (!policy) {
            throw new Error("Policy not found");
        }
    
        const startDate = new Date(data.startDate); // Convert string to Date
        const endDate = new Date(data.endDate); // Convert string to Date
    
        // Validate the dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Invalid startDate or endDate format");
        }
    
        // Calculate the number of requested days
        const daysRequested =
            Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
        const leaveBalance = await LeaveBalanceRepository.findOne({
            where: {
                employee: { id: employee.id }, // Use the ID of the employee
                policy: { id: policy.id }, // Use the ID of the policy
                year: new Date().getFullYear(),
            },
            relations: ['employee', 'policy'], // Include relations if needed
        });
    
        if (!leaveBalance || leaveBalance.policy.defaultCredit < daysRequested) {
            throw new Error("Insufficient leave balance");
        }

    
        const newLeave = new Leave();
        newLeave.employee = employee;
        newLeave.policy = policy;
        newLeave.startDate = data.startDate;
        newLeave.endDate = data.endDate;
    
        const savedLeave = await LeaveRepository.save(newLeave);
    
        const response: LeaveResponseDTO = {
            id: savedLeave.id,
            employeeName: savedLeave.employee.name,
            employeeProfile: savedLeave.employee.profileImg,
            Type: savedLeave.policy.name,
            startDate: savedLeave.startDate,
            endDate: savedLeave.endDate,
        };
    
        return response;
    }

    static async approveLeave(leaveId: number , token:string): Promise<LeaveResponseDTO> {

        const leave = await LeaveRepository.findOne({
            where: { id: leaveId },
            relations: ['employee' , 'policy']
        });

        const admin = await UserService.getUserByJWT(token);

        if (!leave) {
            throw new Error("Leave not found");
        }

        if (leave.status !== "pending") {
            throw new Error("Only pending leaves can be approved");
        }

        
        const leaveBalance = await LeaveBalanceRepository.findOne({
            where: { 
                employee: { id: leave.employee.id }, 
                policy: { id: leave.policy.id }, 
                year: new Date().getFullYear() 
            }
        });

        const startDate = new Date(leave.startDate); // Convert string to Date
        const endDate = new Date(leave.endDate); // Convert string to Date
    
        // Validate the dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Invalid startDate or endDate format");
        }

        const daysRequested =
        Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        if (!leaveBalance || leave.policy.defaultCredit < daysRequested) {
            throw new Error("Insufficient leave balance for approval");
        }

       
        leaveBalance.used += daysRequested;

        // Save the updated balance
        await LeaveBalanceRepository.save(leaveBalance);

        // Update the leave status
        leave.status = "Approved";
        leave.approved_by = admin;

        const savedLeave = await LeaveRepository.save(leave);
    
        const response: LeaveResponseDTO = {
            id: savedLeave.id,
            employeeName: savedLeave.employee.name,
            employeeProfile: savedLeave.employee.profileImg,
            Type: savedLeave.policy.name,
            startDate: savedLeave.startDate,
            endDate: savedLeave.endDate,
            status: savedLeave.status,
            approvedByName: savedLeave.approved_by.username,
            approvedByProfile: savedLeave.approved_by.profileImg
        };
    
        return response;
    }

    static async rejectLeave(leaveId: number , token:string): Promise<Leave> {

        const leave = await LeaveRepository.findOne({
            where: { id: leaveId },
        });

        const admin = await UserService.getUserByJWT(token);

        if (!leave) {
            throw new Error("Leave not found");
        }

        if (leave.status !== "pending") {
            throw new Error("Only pending leaves can be approved");
        }

        leave.status = "Rejected";
        leave.approved_by = admin;

        const savedLeave = await LeaveRepository.save(leave);
    
        return savedLeave;
    }

    static async getAllPendingLeave() :Promise<LeaveTableResponseDTO[]> {
        const allLeave = await LeaveRepository.find({where:{status : 'pending'} , relations: ['policy', 'employee']});
        
        const response : LeaveTableResponseDTO[] = allLeave.map((data) => ({
            id: data.id,
            employeeId: data.employee.id,
            employeeName: data.employee.name,
            employeeProfile : data.employee.profileImg,
            policyId: data.policy.id,
            Type: data.policy.name,
            days : data.policy.defaultCredit,
            startDate: data.startDate,
            endDate: data.endDate
        }));

       return response;
    }

    static async getAllOtherLeave() :Promise<AllLeaveTableResponseDTO[]> {
        const allLeave = await LeaveRepository.find({where:{status : Not('pending')} , relations: ['policy', 'employee' , 'approved_by']});
        
        const response : AllLeaveTableResponseDTO[] = allLeave.map((data) => ({
            id: data.id,
            employeeName: data.employee.name,
            employeeProfile : data.employee.profileImg,
            policyId: data.policy.id,
            Type: data.policy.name,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate,
            modifiedByName: data.approved_by.username,
            modifiedByProfile: data.approved_by.profileImg
        }));

       return response;
    }

    static async editLeaveRequest(leaveId : number , data : LeaveRequestDTO): Promise<LeaveResponseDTO>{
        const leaveRequest = await LeaveRepository.findOne({
            where: { id: leaveId },
            relations: ['employee', 'policy'], // Include relations if necessary
        });
    
        if (!leaveRequest) {
            throw new Error(`Leave request with ID ${leaveId} not found`);
        }

        if (leaveRequest.status !== 'pending') {
            throw new Error('Only pending leave requests can be edited');
        }

        const employee =  await EmployeeRepository.findOneBy({id : data.employeeId});
        const policy = await LeavePolicyRepository.findOneBy({id : data.policyId});
        
        leaveRequest.employee = employee;
        leaveRequest.policy = policy;
        leaveRequest.startDate = data.startDate;
        leaveRequest.endDate = data.endDate;
        
        const updatedLeave = await LeaveRepository.save(leaveRequest);

        const response : LeaveResponseDTO ={
            id : updatedLeave.id,
            employeeName : updatedLeave.employee.name,
            employeeProfile : updatedLeave.employee.profileImg,
            Type : updatedLeave.policy.name,
            startDate : updatedLeave.startDate,
            endDate : updatedLeave.endDate        }

        return response;
    }

    static async deleteLeaveRequest(leaveId :number) {

        const leaveRequest = await LeaveRepository.findOne({
            where: { id: leaveId },
            relations: ['employee', 'policy'], // Include relations if necessary
        });
    
        if (!leaveRequest) {
            throw new Error(`Leave request with ID ${leaveId} not found`);
        }
    
        // Check if the status allows deletion (e.g., 'pending')
        if (leaveRequest.status !== 'pending') {
            throw new Error('Only pending leave requests can be deleted');
        }

        await LeaveRepository.delete(leaveRequest.id);
        return true;
    }

}