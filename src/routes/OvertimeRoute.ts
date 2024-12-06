import { OvertimeController } from "@controllers/OvertimeController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authenticateToken , authorizeRoles('admin' , 'hr') , OvertimeController.createOT);
router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , OvertimeController.getAll);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , OvertimeController.editOvertime);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , OvertimeController.deleteOvertime);

export default router;