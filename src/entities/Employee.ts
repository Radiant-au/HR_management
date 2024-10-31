import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Department } from "./Department";

import { Einformation } from "./Einformation";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phNo: string;

    @Column()
    name: string;

    @Column()
    profileImg: string;

    @Column()
    CurrentAddress: string;

    @Column()
    PermanentAddress: string;

    @OneToOne(() => Einformation ,  { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "e_background_id" })
    education: Einformation;

    @ManyToOne(() => Department) 
    @JoinColumn({ name: "department_id" })
    department: Department;

    @Column()
    position: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "created_by" })
    created_by: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
