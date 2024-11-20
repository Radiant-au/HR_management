import { AppDataSource } from "@config/data-source";
import { Shift } from "@entities/Shift";

export const ShiftRepository = AppDataSource.getRepository(Shift);
