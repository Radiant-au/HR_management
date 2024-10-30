import { EmployeeController } from "@controllers/EmployeeController";
import { authenticateToken } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();
router.post("/", authenticateToken ,EmployeeController.createEmployee);
router.get("/" , authenticateToken , EmployeeController.getAllEmployee);
router.put("/:id" , authenticateToken , EmployeeController.updateEmployee);
router.get("/:id" , authenticateToken , EmployeeController.getEmployeeById);
router.delete("/:id" , authenticateToken , EmployeeController.deleteEmployee);

export default router;
