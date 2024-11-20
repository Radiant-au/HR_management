import { UserController } from "@controllers/UserController";
import { fileFilter, storage } from "@middlewares/StorageMiddleware";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({
                storage,
                limits: {
                    fileSize: 10 * 1024 * 1024, // 10 MB limit
                },
                fileFilter,
                });

router.put("/register/:id", UserController.registerPassword);
router.get("/" , UserController.getUserProfile);
router.put("/update" , upload.single("profileImage") , UserController.updateProfile)


export default router;
