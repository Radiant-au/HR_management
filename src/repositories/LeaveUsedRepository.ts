import { AppDataSource } from "@config/data-source";
import { LeaveUsedInfo } from "@entities/LeaveUsedInfo";


export const LeaveUsedRepository = AppDataSource.getRepository(LeaveUsedInfo);
