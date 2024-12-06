import { OvertimeService } from "@services/OvertimeService";
import { Request, Response } from "express";

export class OvertimeController{

    static async createOT(req: Request, res: Response){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const OTData = req.body;
            const ot = await OvertimeService.createOvertime(OTData , token);
            res.status(201).json(ot);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating shift", error });
        }
    }

    static async getAll(req: Request , res: Response){
        try {
            const overtime = await OvertimeService.getAllOvertime();
            res.status(200).json(overtime);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async editOvertime(req: Request , res: Response){
        try{
            const OTid = parseInt(req.params.id);
            const OTData = req.body;
            const overtime = await OvertimeService.editOvertime(OTid , OTData);
            res.status(200).json(overtime);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error editing shift", error });
        }
    }

    static async deleteOvertime(req: Request , res: Response){
        try{
            const id = parseInt(req.params.id);
            const resp = await OvertimeService.softDeleteOvertime(id);
            res.status(200).json(resp);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error editing shift", error });
        }
    }
}