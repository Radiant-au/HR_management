import { UPLOADS_DIR } from "@middlewares/StorageMiddleware";
import { DepartmentService } from "@services/DepartmentService";
import { ExcelUploadService } from "@services/ExcelUploadService";
import { Request, Response } from "express";
import path from "path";

export class ExcelController{

    static async handleExcel(req: Request , res: Response){
        try {
            const excelFile = req.file;
            const token = req.headers.authorization?.split(" ")[1];
            if (!excelFile) {
                 res.status(400).json({ error: 'No file uploaded' });
                 return;
            }
            const filePath = path.join(UPLOADS_DIR, excelFile.filename);
            ExcelUploadService.processExcelFile(filePath , token)
            res.status(200).json("success");
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error loading excel", error });
        }
    }
}