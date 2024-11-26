import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Department } from "./Department";

import { Einformation } from "./Einformation";
import { Position } from "./Position";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    phNo: string;

    @Column()
    name: string;

    @Column({nullable : true})
    profileImg: string;

    @Column({ unique: true , nullable: true  })
    email: string;

    @Column()
    CurrentAddress: string;

    @Column()
    PermanentAddress: string;

    @OneToOne(() => Einformation)
    @JoinColumn({ name: "e_background_id" })
    education: Einformation;

    @ManyToOne(() => Department) 
    @JoinColumn({ name: "department_id" })
    department: Department;

    @ManyToOne(() => Position)
    @JoinColumn({name: "position_id"})
    position: Position;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    userId: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
