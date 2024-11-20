import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn} from "typeorm";

@Entity()
export class Einformation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    degreeOrCertificate: string;

    @Column({nullable: true})
    experience: string;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
