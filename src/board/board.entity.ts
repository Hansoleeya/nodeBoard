import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";
import { Reply } from "src/reply/rely.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    content:string;

    @Column()
    bStatus: BoardStatus;

    @Column()
    delYN: string;

    @Column()
    writeDate: Date;

    @Column()
    updateDate: Date;

    @ManyToOne(type => User, user => user.boards, {eager:false})
    user: User;

    @OneToMany(type => Reply, reply => reply.board, {eager: true})
    replys: Reply[];
}