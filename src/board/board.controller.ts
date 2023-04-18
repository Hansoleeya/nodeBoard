import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardsService} from "./board.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/createBoard.dto";
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateReplyDto } from 'src/reply/dto/createReply.dto';
import { Reply } from 'src/reply/rely.entity';
import { ReplyService } from 'src/reply/reply.service';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('Board');
    constructor(private boardsService: BoardsService
              , private replyService: ReplyService) {}

    //전체 게시글 가져오기
    @Get('/')
    getAllBoard(@GetUser() user: User):Promise<Board[]> {
        this.logger.verbose(`사용자 ${user.username}이 전체 게시글목록 조회했습니다.`);
        return this.boardsService.getAllBoards();
    }

    //게시글 생성
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
                @GetUser() user:User):Promise<Board>{
                    this.logger.verbose(`사용자 ${user.username}이 새로운 게시글 생성했습니다.
                     Payload: ${JSON.stringify(createBoardDto) }`);
        return this.boardsService.createBoard(createBoardDto, user);
    }

    //게시글 정보가져오기
    @Get('/:id')
    getBoardById(@Param('id') id:number,
                 @GetUser() user:User) : Promise<Board>{
        this.logger.verbose(`사용자 ${user.username}가 게시글 번호 ${id}를 조회했습니다.`);
        return this.boardsService.getBoardById(id,user);
    }

    //게시글 삭제
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
                @GetUser() user:User):Promise<void>{
        this.logger.verbose(`사용자 ${user.username}가 게시글 번호 ${id}를 삭제했습니다.`);
        return this.boardsService.deleteBoard(id,user);
    }

    //게시글 내용변경
    @Patch('/:id/update')
    updateBoard(@Param('id',ParseIntPipe) id: number,
                      @Body() board:Board,
                      @GetUser() user:User){
        this.logger.verbose(`사용자 ${user.username}가 게시글 번호 ${id} 내용을 변경했습니다.`);
        return this.boardsService.updateBoard(id, board, user);
    }

    //게시글 상태변경
    @Patch('/:id/status')
    updateBoardStatus(@Param('id',ParseIntPipe) id: number,
                      @Body('status', BoardStatusValidationPipe) status: BoardStatus,
                      @GetUser() user:User
                      ){
        this.logger.verbose(`사용자 ${user.username}가 게시글 번호 ${id} 상태를 ${status}로 변경했습니다.`);
        return this.boardsService.updateBoardStatus(id, status, user);
    }

    // 댓글 등록
    @Post('/:id/reply')
    creatReply(@Param('id') id:number,
               @Body() createReplyDto: CreateBoardDto,
               @GetUser() user:User):Promise<Reply>{
        this.logger.verbose(`사용자 ${user.username}가 게시글 번호 ${id}에 댓글 등록했습니다.`);
        return this.replyService.createReply(createReplyDto, id, user);
    }
    
}
