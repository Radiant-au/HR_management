import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { LeavePolicy } from "./LeavePolicty";

@Entity()
export class LeaveBalance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @ManyToOne(() => LeavePolicy)
    policy: LeavePolicy;

    @Column({ type: 'int', default: 0 })
    credit: number; // Total leave allowed

    @Column({ type: 'int', default: 0 })
    used: number; // Leave taken

    @Column({ type: 'int', default: 0 })
    unpaid: number; // Unpaid leave taken

    @Column({ type: 'int', default: 0 })
    carryForwarded: number; // Previous year's carry-forward
}
