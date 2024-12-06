import { leavePolicyRequest, leavePolicyResponse } from "@dtos/LeavePolicyDto";
import { LeavePolicy } from "@entities/LeavePolicty";
import { LeavePolicyRepository } from "@repositories/LeavePolicyRepository";

export class LeavePolicyService {

    static async createPolicy(data :leavePolicyRequest) :Promise<leavePolicyResponse>{
        const leavepolicy = new LeavePolicy();

        leavepolicy.name = data.name;
        leavepolicy.defaultCredit = data.days;

        const savedLeave = await LeavePolicyRepository.save(leavepolicy);
        const res : leavePolicyResponse = {
            id : savedLeave.id,
            name: savedLeave.name,
            days: savedLeave.defaultCredit
        }

        return res;
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
