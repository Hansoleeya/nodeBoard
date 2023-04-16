import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardsService} from "./board.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/createBoard.dto";
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('Board');
    constructor(private boardsService: BoardsService) {}

    //전체 게시글 가져오기
    @Get('/')
    getAllBoard(@GetUser() user: User):Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards();
    }

    //게시글 생성
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
                @GetUser() user:User):Promise<Board>{
                    this.logger.verbose(`User ${user.username} creating a new board.
                     Payload: ${JSON.stringify(createBoardDto) }`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    //게시글 정보가져오기
    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    //게시글 삭제
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user:User):Promise<void>{
        return this.boardsService.deleteBoard(id,user);
    }

    //
    @Patch('/:id/status')
    updateBoardStatus(@Param('id',ParseIntPipe) id: number, 
                      @Body('status', BoardStatusValidationPipe) status: BoardStatus){
            return this.boardsService.updateBoardStatus(id,status);
    }
    
}
