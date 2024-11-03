import { EmployeeController } from "@controllers/EmployeeController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { storage } from "@middlewares/StorageMiddleware";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage });

router.post("/", authenticateToken , authorizeRoles('admin' , 'hr') , upload.single("profileImage") ,EmployeeController.createEmployee);
router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.getAllEmployee);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , upload.single("profileImage") , EmployeeController.updateEmployee);
router.get("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.getEmployeeById);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , EmployeeController.deleteEmployee);

export default router;
