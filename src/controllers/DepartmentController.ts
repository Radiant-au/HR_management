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

    static async create(req: Request , res: Response){
        try {
            const data = req.body;
            const department = await DepartmentService.createDepartment(data);
            res.status(201).json(department);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async edit(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            const department = await DepartmentService.editDepartment(id , data);
            res.status(200).json(department);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }
}