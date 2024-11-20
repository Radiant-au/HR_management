import { ShiftController } from "@controllers/ShiftController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.createShift);
router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.getAllShift);
router.post("/assign/:id", authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.assignEmployee);
router.get("/employees" , authenticateToken , authorizeRoles('admin' , 'hr') , ShiftController.shiftEmployees);


export default router;