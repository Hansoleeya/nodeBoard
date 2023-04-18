import { User } from "src/auth/user.entity";
import { Board } from "src/board/board.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reply extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content:string;

    @Column()
    writeDate: Date;

    @ManyToOne(type => Board, board => board.replys, {eager:false})
    board: Board;

    @ManyToOne(type => User, user => user.reply, {eager:false} )
    user: User;

}