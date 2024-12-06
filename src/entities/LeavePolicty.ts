import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class LeavePolicy {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({ type: 'int', default: 0 })
    defaultCredit: number; // Default credit for the policy
}
