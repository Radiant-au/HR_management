import { UserController } from "@controllers/UserController";
import { Router } from "express";

const router = Router();

router.put("/register/:id", UserController.registerPassword);


export default router;
