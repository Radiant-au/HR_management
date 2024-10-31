import { AppDataSource } from "@config/data-source";
import { Department } from "@entities/Department";

export const DepartmentRepository = AppDataSource.getRepository(Department);
