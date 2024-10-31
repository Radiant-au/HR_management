import { AttendanceService } from "@services/AttendanceService";
import { Request, Response } from "express";


export class AttendanceController{

    static async checkIn(req : Request , res : Response) {
        try{
            const id = parseInt(req.params.id);
            const checkIn = await AttendanceService.CheckInAttendance(id);
            res.status(200).json(checkIn);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error Check In", error });
        }
    }

    static async checkOut(req : Request , res : Response) {
        try{
            const id = parseInt(req.params.id);
            const checkOut = await AttendanceService.CheckOutAttendance(id);
            res.status(200).json(checkOut);
        }catch(error){
            console.error(error); 
            res.status(500).json({ message: "Error Check In", error });
        }
    }
}