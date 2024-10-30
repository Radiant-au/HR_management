import { Einformation } from "@entities/Einformation";
import { Employee } from "@entities/Employee";
import { EinformationRepository } from "@repositories/Einformation";
import { EmployeeService } from "./EmployeeService";

export class EinfoService {

    static async createInformation(data: { degreeOrCertificate: string, experience: string }): Promise<Einformation> {
        const einformation = new Einformation();
        einformation.degreeOrCertificate = data.degreeOrCertificate;
        einformation.experience = data.experience;

        return await EinformationRepository.save(einformation);
    }

    static async updateInformation( id : number , data: { degreeOrCertificate: string, experience: string }): Promise<Einformation> {
        const einformation = await EinformationRepository.findOneBy({id});
        einformation.degreeOrCertificate = data.degreeOrCertificate;
        einformation.experience = data.experience;

        return await EinformationRepository.save(einformation);
    }

}
