import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    bId:number;

    @Column()
    bTitle:string;

    @Column()
    description:string;

    @Column()
    bStatus: BoardStatus;
}