import { EmployeeService } from "@services/EmployeeService";
import { Request, Response } from "express";

export class EmployeeController {

    static async createEmployee(req: Request, res: Response){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const employeeData = req.body;
            const profileImg = req.file?.filename; 
            const employee = await EmployeeService.createEmployee(employeeData , token , profileImg);
            res.status(201).json(employee);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating employee", error });
        }
    }

    static async getAllEmployee(req: Request , res: Response){
        try {
            const employee = await EmployeeService.getAllEmployee();
            res.status(200).json(employee);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async getEmployeeById(req: Request , res: Response){
        try{
            const id = parseInt(req.params.id);
            const employee = await EmployeeService.getEmployeeById(id);
            res.status(200).json(employee);
        }catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async updateEmployee(req: Request , res: Response){
        try {
            const id  = parseInt(req.params.id);
            const employeeData = req.body;
            const profileImg = req.file?.filename; 
            const updatedEmployee = await EmployeeService.updateEmployee(id , employeeData , profileImg);
            res.status(200).json(updatedEmployee);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error update employee", error });
        }
    }

    static async deleteEmployee(req: Request , res: Response){
        try{
            const id = parseInt(req.params.id);
            await EmployeeService.deleteEmployee(id);
            res.status(200).json({message : "Successfully Deleted employee id" + id});
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Error deleting employee" , error});
        }
    }
}
