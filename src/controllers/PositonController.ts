
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
}