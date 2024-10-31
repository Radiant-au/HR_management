import { AttendanceController } from "@controllers/AttendanceController";
import { Router } from "express";

const router = Router();

router.post("/checkIn/:id", AttendanceController.checkIn);
router.put("/checkOut/:id", AttendanceController.checkOut);


export default router;
