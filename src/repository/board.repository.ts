import { Repository } from "typeorm";
import { CustomRepository } from "../board/typeorm/typeorm-ex.decorator";
import { Board } from "../board/board.entity";
import { CreateBoardDto } from "../board/dto/createBoard.dto";
import { BoardStatus } from "../board/board-status.enum";
import {v1 as uuid} from 'uuid';
import { User } from "src/auth/user.entity";


@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto: CreateBoardDto, user:User):Promise<Board>{
        const{title, content} = createBoardDto;

        const board = this.create({
            id:uuid(),
            title,
            content,
            bStatus:BoardStatus.PUBLIC,
            writeDate:Date(),
            updateDate:Date(),
            user:user
        });
        await this.save(board);
        return board;
    }
}