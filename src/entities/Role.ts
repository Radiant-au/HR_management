import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string; // Examples: "HR", "Employee", "Admin"
}
