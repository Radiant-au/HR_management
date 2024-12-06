
import { EmpOvertimeController } from "@controllers/EmpOvertimeController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , EmpOvertimeController.overtimeEmployee);
router.post("/:id", authenticateToken , authorizeRoles('admin' , 'hr') , EmpOvertimeController.assignEmployee);
router.get('/employee/:id' ,authenticateToken , authorizeRoles('admin' , 'hr') , EmpOvertimeController.getUnassignedEmployees);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , EmpOvertimeController.deleteEmpOvertime);

export default router;
