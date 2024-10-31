import { LeaveController } from "@controllers/LeaveController";
import { authenticateToken } from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/:id", authenticateToken , LeaveController.createLeave);


export default router;
