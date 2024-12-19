import { LeaveService } from "@services/LeaveService";
import { Request, Response } from "express";

export class LeaveController{

    static async createLeave(req : Request , res : Response) {
        try{
            const createLeave = await LeaveService.createLeave(req.body);
            res.status(201).json(createLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error Create Leave", error });
        }
    }

    static async allPendingLeave(req : Request , res : Response) {
        try{

            const allLeave = await LeaveService.getAllPendingLeave();
            res.status(200).json(allLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error get allLeave", error });
        }
    }

    static async getOtherLeave(req : Request , res : Response) {
        try{

            const allLeave = await LeaveService.getAllOtherLeave();
            res.status(200).json(allLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error get allLeave", error });
        }
    }

    static async editLeaveRequest(req : Request , res : Response) {
        try{
            const id = parseInt(req.params.id);
            const data = req.body;
            const editedLeave = await LeaveService.editLeaveRequest(id , data);
            res.status(200).json(editedLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error get allLeave", error });
        }
    }

    static async approveLeaveRequest(req : Request , res : Response) {
        try{
            const token = req.headers.authorization?.split(" ")[1];
            const id = parseInt(req.params.id);
            const approveLeave = await LeaveService.approveLeave(id , token);
            res.status(200).json(approveLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error approve Leave", error });
        }
    }

    static async rejectLeaveRequest(req : Request , res : Response) {
        try{
            const token = req.headers.authorization?.split(" ")[1];
            const id = parseInt(req.params.id);
            const rejectLeave = await LeaveService.rejectLeave(id , token);
            res.status(200).json(rejectLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error reject Leave", error });
        }
    }

    static async deleteLeave(req : Request , res : Response) {
        try{
            const id = parseInt(req.params.id);
            const deletedLeave = await LeaveService.deleteLeaveRequest(id);
            res.status(200).json(deletedLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error get allLeave", error });
        }
    }

}