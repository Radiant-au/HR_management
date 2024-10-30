import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Einformation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    degreeOrCertificate: string;

    @Column()
    experience: string;
}
