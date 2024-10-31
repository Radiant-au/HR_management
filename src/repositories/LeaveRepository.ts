import { AppDataSource } from "@config/data-source";
import { Leave } from "@entities/Leave";

export const LeaveRepository = AppDataSource.getRepository(Leave);
