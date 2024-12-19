import { LeaveController } from "@controllers/LeaveController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.createLeave);
router.get("/pend" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.allPendingLeave);
router.get("/all" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.getOtherLeave);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.editLeaveRequest);
router.put("/approve/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.approveLeaveRequest);
router.put("/reject/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.rejectLeaveRequest);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.deleteLeave);

export default router;
