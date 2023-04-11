import {Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardsService} from "./board.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/createBoard.dto";
import { get } from 'http';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard():Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // addBoard(@Body() addBoardDto: addBoardDto): Board{
    //     return this.boardsService.addBoard(addBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto):Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get('/:bId')
    getBoardById(@Param('bId') bId:number) : Promise<Board>{
        return this.boardsService.getBoardById(bId);
    }


    // @Get('/:id')
    // getBoardById(@Param('id') bId: string): Board{
    //     return this.boardsService.getBoardById(bId);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') bId: string):void{
    //     this.boardsService.deleteBoard(bId);
    // }
    
    // @Patch('/:id/status')
    // updateBoardStatus(@Param('id') bId: string, 
    //                   @Body('status', BoardStatusValidationPipe) status: BoardStatus){
    //         return this.boardsService.updateBoardStatus(bId,status);
    // }
    
}
