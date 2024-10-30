import { AppDataSource } from "@config/data-source";
import { Einformation } from "@entities/Einformation";


export const EinformationRepository = AppDataSource.getRepository(Einformation);