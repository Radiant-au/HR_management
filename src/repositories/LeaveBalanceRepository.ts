import { AppDataSource } from "@config/data-source";
import { LeaveBalance } from "@entities/LeaveBalance";

export const LeaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
