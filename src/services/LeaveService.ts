import { LeaveRequestDTO, LeaveResponseDTO } from "@dtos/LeaveDto";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { LeavePolicyRepository } from "@repositories/LeavePolicyRepository";
import { UserService } from "./UserService";
import { Leave } from "@entities/Leave";
import { LeaveRepository } from "@repositories/LeaveRepository";
import { LeaveLog } from "@entities/LeaveLog";
import { LeaveLogRepository } from "@repositories/LeaveLogRepository";


export class LeaveService{
    
    static async createLeave(data: LeaveRequestDTO , id : string , token :string): Promise<LeaveResponseDTO> {

        const employee = await EmployeeRepository.findOne({ where: { id },
                         relations: ['department']});
        const policy = await LeavePolicyRepository.findOne({where : { id : data.policyId}});
        const approvedBy = await UserService.getUserByJWT(token); 

        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        start.setUTCHours(0, 0, 0, 0);
        end.setUTCHours(0, 0, 0, 0);

        const leave = new Leave();
        leave.employee = employee;
        leave.policy = policy;
        leave.startDate = start;
        leave.endDate = end;
        leave.approvedBy = approvedBy;
        leave.approvedAt = new Date();

        const leave_log = new LeaveLog();
        leave_log.employee = employee;
        leave_log.policy = policy;

        await LeaveLogRepository.save(leave_log);

        const savedLeave = await LeaveRepository.save(leave);
        

        const response : LeaveResponseDTO ={
            id: savedLeave.id,
            employee: savedLeave.employee.name,
            policy: savedLeave.policy.name,
            startDate: savedLeave.startDate,
            endDate: savedLeave.endDate,
            approvedBy: savedLeave.approvedBy.username,
            approvedAt: savedLeave.approvedAt
        }

        return response;
    }

    static async getAllLeave() :Promise<LeaveResponseDTO[]> {
        const allLeave = await LeaveRepository.find({relations: ['approvedBy', 'policy', 'employee']});
        
        const response : LeaveResponseDTO[] = allLeave.map((data) => ({
            id: data.id,
            employee: data.employee.name,
            policy: data.policy.name,
            startDate: data.startDate,
            endDate: data.endDate,
            approvedBy: data.approvedBy.username,
            approvedAt: data.approvedAt
        }));

       return response;
    }

}