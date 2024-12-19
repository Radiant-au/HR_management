import { EmployeeController } from "@controllers/EmployeeController";
import { ExcelController } from "@controllers/ExcelController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { fileFilter, storage } from "@middlewares/StorageMiddleware";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({
                storage,
                limits: {
                    fileSize: 10 * 1024 * 1024, // 10 MB limit
                },
                fileFilter,
                });

router.post("/", authenticateToken , authorizeRoles('admin' , 'hr') , upload.single("profileImage") ,EmployeeController.createEmployee);
router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.getAllEmployee);
router.get("/scroll/get" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.getAllScorllEmployee);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , upload.single("profileImage") , EmployeeController.updateEmployee);
router.get("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.getEmployeeById);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.deleteEmployee);
router.post("/upload" , authenticateToken , authorizeRoles('admin' , 'hr'), upload.single('excelFile')  , ExcelController.handleExcel );


export default router;
