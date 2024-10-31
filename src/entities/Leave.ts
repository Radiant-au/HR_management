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

    @ManyToOne(() => User, { nullable: true }) // Make approvedBy nullable
    approvedBy: User | null;

    @Column({ nullable: true })
    approvedAt: Date;
}
