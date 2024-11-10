import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { LeavePolicy } from "./LeavePolicty";


@Entity()
export class LeaveLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @ManyToOne(() => LeavePolicy)
    policy: LeavePolicy; // Relates used leave to a specific policy
}
