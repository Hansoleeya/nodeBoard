 import { Injectable, NotFoundException } from '@nestjs/common';
 import {BoardStatus} from "./board-status.enum";
 import {v1 as uuid} from 'uuid';
 import {CreateBoardDto} from "./dto/createBoard.dto";
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { Not } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ){}

    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    createBoard(CreateBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(CreateBoardDto);
    }

    async getBoardById(bId: number): Promise<Board>{
        const found = await this.boardRepository.findOneBy({bId});
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${bId}`);
        }
        return found;
    }

    async deleteBoard(bId: number):Promise<void>{
        const result = await this.boardRepository.delete(bId);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${bId}`);
        }
        
    }

    async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);
        board.bStatus = status;
        await this.boardRepository.save(board);

        return board;
    }

}
