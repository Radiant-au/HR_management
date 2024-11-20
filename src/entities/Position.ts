import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
