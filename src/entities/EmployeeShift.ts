import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Employee";
import { Shift } from "./Shift";
import { User } from "./User";

@Entity()
export class EmployeeShift {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Employee, (employee) => employee.id)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: "shift_id" })
    shift: Shift;

    @ManyToOne(() => User) // Make approvedBy nullable
    createdBy: User;
}
