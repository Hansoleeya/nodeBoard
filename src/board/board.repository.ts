import { Repository } from "typeorm";
import { CustomRepository } from "./typeorm/typeorm-ex.decorator";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { BoardStatus } from "./board-status.enum";
import {v1 as uuid} from 'uuid';


@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(CreateBoardDto: CreateBoardDto):Promise<Board>{
        const{bTitle, description} = CreateBoardDto;

        const board = this.create({
            bId:uuid(),
            bTitle,
            description,
            bStatus:BoardStatus.PUBLIC
        })
        
        await this.save(board);
        return board;
    }
}