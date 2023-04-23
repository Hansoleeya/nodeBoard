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

  // query = this.boardRepository.createQueryBuilder('board');

   // 게시글 전체 목록
   async getAllBoards(): Promise<Board[]>{
       const  query = this.boardRepository.createQueryBuilder('board');
       query.where('board.bStatus = :bStatus',{bStatus:'PUBLIC'})
       .andWhere('board.delYN = :delYN', {delYN: 'N'});;
       const boards = await  query.getMany();
       return boards;
   }

   // 게시글 생성
   createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
       return this.boardRepository.createBoard(createBoardDto, user);
   }

   // 게시글 상세정보
   async getBoardById(id: number, user:User): Promise<Board>{
       const  query = this.boardRepository.createQueryBuilder('board');
       query
            .leftJoinAndSelect('board.user','users')
            .leftJoinAndSelect('board.replys','replys')
            .where('board.id = :bId',{bId: id})
            
       const board = await query.getOne();
        
       if(!board) throw new NotFoundException(`게시글 번호 ${id}를 찾을 수 없습니다.`);
       else{
           if(board.bStatus === 'PRIVATE' && board.user.userId !== user.userId){
               throw new NotFoundException(`게시글 번호 ${id}를 작성한 사용자가 아닙니다.`);
           }
       }
       return board;
   }

   //게시글 삭제
   async deleteBoard(id: number, user:User):Promise<Board>{
       const found = await this.boardRepository.findOneBy({id});

       if(!found) throw new NotFoundException(`게시글 번호 ${id} 가 존재하지 않아 삭제할 수 없습니다.`);
       
       const board = await this.getBoardById(id, user);
       board.delYN = 'Y';
       await this.boardRepository.save(board);
       
       return board;
       
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
