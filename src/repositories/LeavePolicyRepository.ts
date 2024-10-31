
import { AppDataSource } from "@config/data-source";
import { LeavePolicy } from "@entities/LeavePolicty";

export const LeavePolicyRepository = AppDataSource.getRepository(LeavePolicy);
