import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { LeavePolicy } from "./LeavePolicty";


@Entity()
export class LeaveUsedInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @ManyToOne(() => LeavePolicy)
    policy: LeavePolicy; // Relates used leave to a specific policy

    @Column("int")
    usedDays: number; // Days the employee has already used for this policy
}
