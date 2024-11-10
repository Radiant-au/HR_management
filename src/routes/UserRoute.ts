import { UserController } from "@controllers/UserController";
import { storage } from "@middlewares/StorageMiddleware";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage });

router.put("/register/:id", UserController.registerPassword);
router.get("/" , UserController.getUserProfile);
router.put("/update" , upload.single("profileImage") , UserController.updateProfile)


export default router;
