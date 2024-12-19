import { AppDataSource } from "@config/data-source";
import { leavePolicyRequest, leavePolicyResponse } from "@dtos/LeavePolicyDto";
import { Employee } from "@entities/Employee";
import { LeaveBalance } from "@entities/LeaveBalance";
import { LeavePolicy } from "@entities/LeavePolicty";
import { LeavePolicyRepository } from "@repositories/LeavePolicyRepository";

export class LeavePolicyService {

    static async createPolicy(data: leavePolicyRequest): Promise<leavePolicyResponse> {
        return await AppDataSource.transaction(async (transactionManager) => {
            // Create and save the leave policy
            const leavepolicy = new LeavePolicy();
            leavepolicy.name = data.name;
            leavepolicy.defaultCredit = data.days;
            const savedLeave = await transactionManager.save(LeavePolicy, leavepolicy);
    
            // Fetch all employees
            const employees = await transactionManager.find(Employee);
            if (employees.length > 0) {
                // Create leave balances for all employees
                const leaveBalances = employees.map(employee => {
                    return transactionManager.create(LeaveBalance, {
                        employee,
                        policy: savedLeave,
                        year: new Date().getFullYear(), // Assuming the current year
                        credit: savedLeave.defaultCredit,
                        used: 0,
                    });
                });
    
                // Save all leave balances
                await transactionManager.save(LeaveBalance, leaveBalances);
            }
    
            // Prepare and return response
            const res: leavePolicyResponse = {
                id: savedLeave.id,
                name: savedLeave.name,
                days: savedLeave.defaultCredit,
            };
    
            return res;
        });
    }

    static async editLeavePolicy(id: number, data :leavePolicyRequest) :Promise<leavePolicyResponse>{
        const leavepolicy = await LeavePolicyRepository.findOneBy({id});

        leavepolicy.name = data.name || leavepolicy.name;
        leavepolicy.defaultCredit = data.days || leavepolicy.defaultCredit;

        const updatedpolicy = await LeavePolicyRepository.save(leavepolicy);
        const res : leavePolicyResponse = {
            id : updatedpolicy.id,
            name: updatedpolicy.name,
            days: updatedpolicy.defaultCredit
        }

        return res;
    }

    static async getAllpolicy() :Promise<leavePolicyResponse[]>{
        const allPolicies = await LeavePolicyRepository.find();

        const res : leavePolicyResponse[] = allPolicies.map((p) => ({
            id : p.id,
            name : p.name,
            days : p.defaultCredit
        }));

        return res;
    }

    static async deletePolicy(id: number) {
        const policy = await LeavePolicyRepository.findOneBy({id});
        if(policy){
            await LeavePolicyRepository.delete(policy);
        }
        return true;
    }
}
