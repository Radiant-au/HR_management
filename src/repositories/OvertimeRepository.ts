import { AppDataSource } from "@config/data-source";
import { Overtime } from "@entities/Overtime";


export const OvertimeRepository = AppDataSource.getRepository(Overtime);
