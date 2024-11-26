import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { EmployeeShift } from "./EmployeeShift";


@Entity()
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string; // The type of shift (Day or Night)

    @Column()
    start_time: string; // The start time of the shift (e.g., "08:00")

    @Column()
    end_time: string; // The end time of the shift (e.g., "17:00")

    @Column({ default: 15 })
    grace_period: number; // Grace period in minutes after the start time (e.g., 15 minutes)

    @ManyToOne(() => User) // Make approvedBy nullable
    createdBy: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
    
}
