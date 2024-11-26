import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Employee } from "./Employee";
import { Shift } from "./Shift";
import { User } from "./User";

@Entity()
export class EmployeeShift {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: "shift_id" })
    shift: Shift;

    @ManyToOne(() => User) // Many-to-one relationship with User (createdBy)
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
