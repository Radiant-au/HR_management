// src/repositories/UserRepository.ts
import { User } from "@entities/User";
import { AppDataSource } from "@config/data-source";

export const UserRepository = AppDataSource.getRepository(User);
