import { LeaveService } from "@services/LeaveService";
import { Request, Response } from "express";

export class LeaveController{

    static async createLeave(req : Request , res : Response) {
        try{
            const token = req.headers.authorization?.split(" ")[1];
            const id = parseInt(req.params.id);
            const createLeave = await LeaveService.createLeave(req.body , id , token);
            res.status(200).json(createLeave);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error Check In", error });
        }
    }

}