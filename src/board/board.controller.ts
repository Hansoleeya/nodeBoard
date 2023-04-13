import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardsService} from "./board.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/createBoard.dto";
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    //전체 게시글 가져오기
    @Get('/')
    getAllBoard():Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    //게시글 생성
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto):Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto);
    }

    //게시글 정보가져오기
    @Get('/:id')
    getBoardById(@Param('id') bId:number) : Promise<Board>{
        return this.boardsService.getBoardById(bId);
    }

    //게시글 삭제
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) bId:number):Promise<void>{
        return this.boardsService.deleteBoard(bId);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id',ParseIntPipe) bId: number, 
                      @Body('status', BoardStatusValidationPipe) status: BoardStatus){
            return this.boardsService.updateBoardStatus(bId,status);
    }
    
}
