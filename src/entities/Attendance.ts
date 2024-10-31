import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @Column()
    attendanceDate: Date;

    @Column({nullable: true })
    checkIn: string;

    @Column({nullable: true})
    checkOut: string;

    @Column()
    status: string;
}
