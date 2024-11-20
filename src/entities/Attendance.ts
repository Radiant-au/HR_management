import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Employee";
import { Shift } from "./Shift";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee)
    employee: Employee;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: "shift_id" })
    shift: Shift;

    @Column()
    attendanceDate: Date;

    @Column({nullable: true })
    checkIn: string;

    @Column({nullable: true})
    checkOut: string;

    @Column({
        type: "enum",
        enum: ["PRESENT", "LATE", "ABSENT"],
        default: "PRESENT"
    })
    status: string;
}
