
import { AppDataSource } from "@config/data-source";
import { Employee } from "@entities/Employee";

export const EmployeeRepository = AppDataSource.getRepository(Employee);
