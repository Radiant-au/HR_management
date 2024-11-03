import { LeaveController } from "@controllers/LeaveController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/:id", authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.createLeave);
router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , LeaveController.allLeave);


export default router;
