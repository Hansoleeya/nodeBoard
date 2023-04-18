import { type } from "os";
import { Board } from "src/board/board.entity";
import { Reply } from "src/reply/rely.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    userId: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(type => Board, board => board.user, {eager: true })
    boards: Board[];

    @OneToMany(type => Reply, reply => reply.user, {eager: true })
    reply: Reply[];
}