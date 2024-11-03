import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Department } from "./Department";

import { Einformation } from "./Einformation";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    phNo: string;

    @Column()
    name: string;

    @Column()
    profileImg: string;

    @Column({ unique: true })
    email: string;

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

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    userId: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
