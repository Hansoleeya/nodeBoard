 import { Injectable, NotFoundException } from '@nestjs/common';
 import {BoardStatus} from "./board-status.enum";
 import {CreateBoardDto} from "./dto/createBoard.dto";
 import { BoardRepository } from '../repository/board.repository';
 import { Board } from './board.entity';
 import { User } from 'src/auth/user.entity';


@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ){}

    query = this.boardRepository.createQueryBuilder('board');

    // 게시글 전체 목록
    async getAllBoards(): Promise<Board[]>{
        this.query.where('board.bStatus = :bStatus',{bStatus:'PUBLIC'});
        const boards = await  this.query.getMany();
        return boards;
    }

    // 게시글 생성
    createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // 게시글 상세정보
    async getBoardById(id: number, user:User): Promise<Board>{
        this.query
             .leftJoinAndSelect('board.user','user')
             .leftJoinAndSelect('board.replys','replys')
             .where('board.id = :bId',{bId: id});
        const board = await this.query.getOne();
         
        if(!board) throw new NotFoundException(`게시글 번호 ${id}를 찾을 수 없습니다.`);
        else{
            if(board.bStatus === 'PRIVATE' && board.user.userId !== user.userId){
                throw new NotFoundException(`게시글 번호 ${id}를 작성한 사용자가 아닙니다.`);
            }
        }
        return board;
    }

    //게시글 삭제
    async deleteBoard(id: number, user:User):Promise<void>{
        this.query.delete()
        .from(Board)
        .where('userId = :userId',{userId: user.userId})
        .andWhere('id = :id',{id: id})
        const result = await this.query.execute();
        /*
        const result = await this.boardRepository.delete({
            id,
            user:{
                id: user.id,
            },
        });
        */

        if(result.affected === 0){
            throw new NotFoundException(`게시글 번호 ${id} 가 존재하지 않아 삭제할 수 없습니다.`);
        }
        
    }

    // 게시글 공개/비공개
    async updateBoard(id:number, board:Board, user:User):Promise<Board>{
        const boardInfo = await this.getBoardById(id, user);
        boardInfo.content = board.content;
        boardInfo.updateDate = new Date();
        await this.boardRepository.save(boardInfo);

        return boardInfo;
    }

    // 게시글 공개/비공개
    async updateBoardStatus(id:number, status:BoardStatus, user:User):Promise<Board>{
        const board = await this.getBoardById(id, user);
        board.bStatus = status;
        await this.boardRepository.save(board);

        return board;
    }

}
