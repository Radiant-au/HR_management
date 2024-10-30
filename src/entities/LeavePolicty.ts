import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class LeavePolicy {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    days: number;
}
