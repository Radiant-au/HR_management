
import { PositionController } from "@controllers/PositionController";
import { authenticateToken, authorizeRoles } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.get("/" , authenticateToken , authorizeRoles('admin' , 'hr') , PositionController.getAll);
router.post("/" , authenticateToken , authorizeRoles('admin' , 'hr') , PositionController.create);
router.put("/:id" , authenticateToken , authorizeRoles('admin' , 'hr') , PositionController.edit);


export default router;
