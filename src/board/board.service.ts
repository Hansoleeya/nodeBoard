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

    // 게시글 전체 목록
    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    // 게시글 생성
    createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // 게시글 상세정보
    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOneBy({id});
        if(!found){
            throw new NotFoundException(`게시글 번호 ${id}를 찾을 수 없습니다.`);
        }
        return found;
    }

    //게시글 삭제
    async deleteBoard(id: number,user:User):Promise<void>{
        const result = await this.boardRepository.delete({
            id,
            user:{
            id: user.id,
            },
        });

        if(result.affected === 0){
            throw new NotFoundException(`게시글 번호 ${id} 가 존재하지 않아 삭제할 수 없습니다.`);
        }
        
    }

    // 게시글 수정
    async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);
        board.bStatus = status;
        await this.boardRepository.save(board);

        return board;
    }

}
