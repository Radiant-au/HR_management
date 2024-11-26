import { ShiftController } from "@controllers/ShiftController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.createShift);
router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.getAllShift);
router.get("/:id" , authenticateToken , authorizeRoles('admin' ,'hr') , ShiftController.getShiftById);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.editShift);
router.delete("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.deleteShift);

export default router;