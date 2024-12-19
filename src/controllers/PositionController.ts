
import { PositionService } from "@services/PositionService";
import { Request, Response } from "express";

export class PositionController{

    static async getAll(req: Request , res: Response){
        try {
            const position = await PositionService.getAllPosition();
            res.status(200).json(position);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async create(req: Request , res: Response){
        try {
            const data = req.body;
            const position = await PositionService.createPosition(data);
            res.status(201).json(position);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }

    static async edit(req: Request , res: Response){
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            const position = await PositionService.editPosition(id , data);
            res.status(200).json(position);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting employee", error });
        }
    }
}