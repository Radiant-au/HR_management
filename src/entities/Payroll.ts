import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { User } from "./User";

@Entity()
export class Payroll {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @Column("decimal")
    basicSalary: number;

    @Column("decimal", { nullable: true })
    bonus: number;

    @Column("decimal", { nullable: true })
    deduction: number;

    @Column()
    payDate: Date;

    @ManyToOne(() => User)
    createdBy: User;

    @CreateDateColumn()
    created_at: Date;
}
