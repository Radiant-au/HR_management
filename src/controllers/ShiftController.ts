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
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async assignEmployee(req: Request , res: Response){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const shiftId = req.params.id;
            const employeeId = req.body;
            const shift = await ShiftService.assignEmployeeToShift(employeeId , shiftId , token);
            res.status(201).json(shift);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async shiftEmployees(req: Request , res: Response){
        try {
            const employees_shift = await ShiftService.getEmployeeByShifts();
            res.status(200).json(employees_shift);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }
}
