import { EmpShiftService } from "@services/EmpShiftService";
import { Request, Response } from "express";

export class EmpShiftController{

    static async assignEmployee(req: Request , res: Response){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const shiftId = parseInt(req.params.id);
            const employeeId = req.body;
            const shift = await EmpShiftService.assignEmployeeToShift(employeeId , shiftId , token);
            res.status(201).json(shift);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting assign employee", error });
        }
    }
    
    static async shiftEmployees(req: Request , res: Response){
        try {
            const employees_shift = await EmpShiftService.getEmployeeByShifts();
            res.status(200).json(employees_shift);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting shift", error });
        }
    }


    static async getUnassignedEmployees(req: Request , res: Response){
        try {
            const emp = await EmpShiftService.getUnassignedEmployees();
            res.status(200).json(emp);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting assign employee", error });
        }
    }

    static async deleteEmpShift(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const res1 = await EmpShiftService.deleteEmpShift(id);
            res.status(200).json(res1);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting assign employee", error });
        }
    }

}

