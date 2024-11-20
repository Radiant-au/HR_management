import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn,  ManyToOne, DeleteDateColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    username: string;

    @Column({nullable : true})
    password: string;

    @Column({ unique: true  , nullable : true})
    email: string;

    @Column({ nullable: true })
    profileImg: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: "role_id" })
    role: Role;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
