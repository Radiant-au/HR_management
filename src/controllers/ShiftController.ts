import { EmployeeShiftRepository } from "@repositories/EmployeeShiftRepository";
import { ShiftService } from "@services/ShiftService";
import { Request, Response } from "express";

export class ShiftController {

    static async createShift(req: Request, res: Response){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const shiftData = req.body;
            const shift = await ShiftService.createShift(shiftData , token);
            res.status(201).json(shift);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating shift", error });
        }
    }

    static async getAllShift(req: Request , res: Response){
        try {
            const allShift = await ShiftService.getAllShifts();
            res.status(200).json(allShift);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting shift", error });
        }
    }
   

    static async getShiftById(req: Request , res : Response){
        try{
            const shift_id = parseInt(req.params.id);
            const shift = await ShiftService.getShiftById(shift_id);
            res.status(200).json(shift);
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Error getting shift" , error})
        }
    }


    static async editShift(req: Request , res: Response){
        try{
            const shiftId = parseInt(req.params.id);
            const shiftData = req.body;
            const shift = await ShiftService.editShift(shiftId , shiftData);
            res.status(200).json(shift);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error editing shift", error });
        }
    }
    

    static async deleteShift(req: Request , res: Response){
        try{
            const shiftId = parseInt(req.params.id);
            const resp = await ShiftService.softDeleteShift(shiftId);
            res.status(200).json(resp);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error editing shift", error });
        }
    }
}
