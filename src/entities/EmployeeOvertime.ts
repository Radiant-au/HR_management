import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Overtime } from "./Overtime";
import { Employee } from "./Employee";
import { User } from "./User";

@Entity("employee_overtime")
export class EmployeeOvertime {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Overtime)
  overtime: Overtime;

  @ManyToOne(() => Employee)
  employee: Employee;

  @ManyToOne(() => User, { eager: true })
  assignedBy: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}