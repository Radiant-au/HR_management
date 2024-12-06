import { EmpOvertimeService } from "@services/EmpOvertimeService";
import { Request, Response } from "express";

export class EmpOvertimeController{

    static async assignEmployee(req: Request , res: Response){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const OTid = parseInt(req.params.id);
            const employeeId = req.body;
            const empOvertime = await EmpOvertimeService.assignEmployeeToShift(employeeId , OTid , token);
            res.status(201).json(empOvertime);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting assign employee", error });
        }
    }
    
    static async overtimeEmployee(req: Request , res: Response){
        try {
            const employees_overtime = await EmpOvertimeService.getEmployeeByOvertime();
            res.status(200).json(employees_overtime);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting shift", error });
        }
    }


    static async getUnassignedEmployees(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const emp = await EmpOvertimeService.getUnassignedEmployees(id);
            res.status(200).json(emp);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting assign employee", error });
        }
    }

    static async deleteEmpOvertime(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const res1 = await EmpOvertimeService.deleteEmpOvertime(id);
            res.status(200).json(res1);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting assign employee", error });
        }
    }

}

