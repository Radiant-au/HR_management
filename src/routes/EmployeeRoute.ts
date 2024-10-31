import { EmployeeController } from "@controllers/EmployeeController";
import { authenticateToken } from "@middlewares/AuthMiddleware";
import { storage } from "@middlewares/StorageMiddleware";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage });

router.post("/", authenticateToken , upload.single("profileImage") ,EmployeeController.createEmployee);
router.get("/" , authenticateToken , EmployeeController.getAllEmployee);
router.put("/:id" , authenticateToken , upload.single("profileImage") , EmployeeController.updateEmployee);
router.get("/:id" , authenticateToken , EmployeeController.getEmployeeById);
router.delete("/:id" , authenticateToken , EmployeeController.deleteEmployee);

export default router;
