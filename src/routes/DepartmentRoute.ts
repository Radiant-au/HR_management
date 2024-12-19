import { DepartmentController } from "@controllers/DepartmentController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , DepartmentController.getAll);
router.post("/" , authenticateToken , authorizeRoles('admin' , 'hr') , DepartmentController.create);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , DepartmentController.edit);


export default router;
