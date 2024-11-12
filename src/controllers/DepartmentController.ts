import { DepartmentService } from "@services/DepartmentService";
import { Request, Response } from "express";

export class DepartmentController{

    static async getAll(req: Request , res: Response){
        try {
            const department = await DepartmentService.getAllDepartment();
            res.status(200).json(department);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }
}