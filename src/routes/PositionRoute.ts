
import { PositionController } from "@controllers/PositonController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , PositionController.getAll);


export default router;
