import { AppDataSource } from "@config/data-source";
import { LeaveLog } from "@entities/LeaveLog";



export const  LeaveLogRepository = AppDataSource.getRepository(LeaveLog);
