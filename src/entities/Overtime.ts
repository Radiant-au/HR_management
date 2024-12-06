import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";


@Entity("overtime")
export class Overtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "date" })
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => User)
  createdBy: User;

  @Column({ type: "varchar", length: 50, default: "open" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}