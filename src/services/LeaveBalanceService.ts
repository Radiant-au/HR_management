import { leaveBalanceRequest, LeaveBalanceResponseDto, LeaveEmployeeDto, PolicyDto } from "@dtos/LeaveBalanceDto";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import { LeaveBalanceRepository } from "@repositories/LeaveBalanceRepository";
import { LeavePolicyRepository } from "@repositories/LeavePolicyRepository";

export class LeaveBalanceService {
    
    static async createLeaveBalanceForNewEmployee(employeeId: string, data : leaveBalanceRequest): Promise<LeaveBalanceResponseDto> {
        const employee = await EmployeeRepository.findOne({ where: { id: employeeId } });
        if (!employee) {
          throw new Error('Employee not found');
        }
      
        const leavePolicies = await LeavePolicyRepository.find(); // Fetch all policies
        const leaveBalances = leavePolicies.map((policy) => {
          return LeaveBalanceRepository.create({
            employee,
            policy,
            year: data.year,
            used: 0,
          });
        });
      
        const savedBalances =  await LeaveBalanceRepository.save(leaveBalances);

        const response: LeaveBalanceResponseDto = {
          employee: {
            name: employee.name,
            image: employee.profileImg, // Assuming `profileImg` exists in your Employee entity
          },
          year: data.year,
          policies: savedBalances.map((balance) => ({
            name: balance.policy.name, // Assuming `name` is a field in the LeavePolicy entity
            credit: balance.policy.defaultCredit,
            used: balance.used,
          })),
        };
      
      
        return response;
    }
      
    static async getLeaveBalances(): Promise<LeaveBalanceResponseDto[]> {
      // Fetch required data with relations
      const leaveBalances = await LeaveBalanceRepository.find({
          relations: ['employee', 'policy'],
      });
  
      // Create a map to group leave balances by employee and year
      const groupedBalances = new Map<string, LeaveBalanceResponseDto>();
  
      leaveBalances.forEach((leaveBalance) => {
          const employeeKey = `${leaveBalance.employee.id}-${leaveBalance.year}`; // Unique key for grouping
  
          // Create or update the employee group
          if (!groupedBalances.has(employeeKey)) {
              groupedBalances.set(employeeKey, {
                  employee: {
                      name: leaveBalance.employee.name,
                      image: leaveBalance.employee.profileImg,
                  },
                  year: leaveBalance.year,
                  policies: [],
              });
          }
  
          // Add policy to the corresponding employee group
          const policy: PolicyDto = {
              name: leaveBalance.policy.name,
              credit: leaveBalance.policy.defaultCredit,
              used: leaveBalance.used,
          };
  
          groupedBalances.get(employeeKey)!.policies.push(policy);
      });
  
      // Convert the map to an array of LeaveBalanceResponseDto
      return Array.from(groupedBalances.values());
    }
  
  
}