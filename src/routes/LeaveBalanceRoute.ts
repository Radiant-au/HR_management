import { LeaveBalanceController } from "@controllers/LeaveBalanceController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/:id", authenticateToken , authorizeRoles('admin' , 'hr') , LeaveBalanceController.createLeaveBalance);
router.get("/", authenticateToken , authorizeRoles('admin' , 'hr') , LeaveBalanceController.getAllLeaveBalance);


export default router;
