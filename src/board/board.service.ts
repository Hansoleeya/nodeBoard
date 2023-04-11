 import { Injectable, NotFoundException } from '@nestjs/common';
 import {BoardStatus} from "./board-status.enum";
 import {v1 as uuid} from 'uuid';
 import {CreateBoardDto} from "./dto/createBoard.dto";
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ){}


    // getAllBoards(): Board[]{
    //     return this.boards;
    // }

    // addBoard(addBoardDto : addBoardDto){
    //     const {bTitle, description} = addBoardDto;

    //     const board: Board = {
    //         bId : uuid(),
    //         bTitle,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

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

    // getBoardById(bId: string):Board{
    //     const found = this.boards.find((board) => board.bId == bId);
        
    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id ${bId}`);
    //     }
        
    //     return found;
    // }

    // deleteBoard(bId: string): void{
    //     const found = this.getBoardById(bId);
    //     this.boards.filter((board)=> board.bId !== found.bId);
    // }

    // updateBoardStatus(bId: string, status: BoardStatus): Board{
    //     const board = this.getBoardById(bId);
    //     board.status = status;
    //     return board;
    // }

}
