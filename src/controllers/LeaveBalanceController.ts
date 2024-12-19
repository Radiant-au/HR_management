import { LeaveBalanceService } from "@services/LeaveBalanceService";
import { Request, Response } from "express";

export class LeaveBalanceController{

    static async createLeaveBalance(req : Request , res: Response){
        try{
            const id = req.params.id;
            const data = req.body;
            const leaveBalance = await LeaveBalanceService.createLeaveBalanceForNewEmployee(id , data);
            res.status(201).json(leaveBalance);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error Create LeaveBalance", error });
        }
    }

    static async getAllLeaveBalance(req : Request , res: Response){
        try{
            const leaveBalances = await LeaveBalanceService.getLeaveBalances();
            res.status(200).json(leaveBalances);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error Getting LeaveBalance", error });
        }
    }
}