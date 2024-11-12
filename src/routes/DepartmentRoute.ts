import { DepartmentController } from "@controllers/DepartmentController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , DepartmentController.getAll);


export default router;
