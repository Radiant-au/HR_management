
import { LeavePolicyService } from "@services/LeavePolicyService";
import { Request, Response } from "express";

export class LeavePolicyController {

    static async createLeavePolicy(req: Request, res: Response){
        try {
            const PolicyData = req.body;
            const policy = await LeavePolicyService.createPolicy(PolicyData);
            res.status(201).json(policy);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating shift", error });
        }
    }

    static async getAllLeavePolicy(req: Request , res: Response){
        try {
            const policies = await LeavePolicyService.getAllpolicy();
            res.status(200).json(policies);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating shift", error });
        }
    }


    static async editLeavePolicy(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const PolicyData = req.body;
            const policy = await LeavePolicyService.editLeavePolicy(id , PolicyData);
            res.status(200).json(policy);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating shift", error });
        }
    }
    

    static async deleteLeavePolicy(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const policy = await LeavePolicyService.deletePolicy(id);
            res.status(200).json(policy);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating shift", error });
        }
    }
}
