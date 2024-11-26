
import { EmpShiftController } from "@controllers/EmpShiftController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , EmpShiftController.shiftEmployees);
router.post("/:id", authenticateToken , authorizeRoles('admin' , 'hr') , EmpShiftController.assignEmployee);
router.get('/employee' ,authenticateToken , authorizeRoles('admin' , 'hr') , EmpShiftController.getUnassignedEmployees);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , EmpShiftController.deleteEmpShift);

export default router;
