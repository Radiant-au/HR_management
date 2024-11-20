import { AppDataSource } from "@config/data-source";
import { Position } from "@entities/Position";

export const PositionRepository = AppDataSource.getRepository(Position);
