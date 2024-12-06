import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { User } from "./User";
import { LeavePolicy } from "./LeavePolicty";

@Entity()
export class Leave {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @ManyToOne(() => LeavePolicy)
    policy: LeavePolicy; // Links each leave entry to a specific policy

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ default: 'pending' })
    status: string; // Status column with default value 'pending'

    @ManyToOne(() => User, { nullable: true }) // Make createdBy nullable
    createdBy: User | null;

    @ManyToOne(() => User, { nullable: true }) // Make approvedBy nullable
    approved_by: User | null;
}
