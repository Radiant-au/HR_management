
import { LeavePolicyController } from "@controllers/LeavePolicyController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , LeavePolicyController.getAllLeavePolicy);
router.post("/" , authenticateToken , authorizeRoles('admin' , 'hr') , LeavePolicyController.createLeavePolicy);
router.put("/:id", authenticateToken , authorizeRoles('admin' , 'hr') , LeavePolicyController.editLeavePolicy);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , LeavePolicyController.deleteLeavePolicy);

export default router;
