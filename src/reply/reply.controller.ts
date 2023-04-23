import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { Reply } from './rely.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateReplyDto } from './dto/createReply.dto';
import { User } from 'src/auth/user.entity';

@Controller('reply')
@UseGuards(AuthGuard())
export class ReplyController {
    constructor(private replyService:ReplyService){}
    private logger = new Logger('Reply');

    // 댓글 등록
    @Post('/:uuid/replyAdd')
    creatReply(@Param('uuid') uuid:number,
               @Body() createReplyDto: CreateReplyDto,
               @GetUser() user:User):Promise<Reply>{
        this.logger.verbose(`사용자 ${user.username}가 게시글 번호 ${uuid}에 댓글 등록했습니다.`);
        return this.replyService.createReply(createReplyDto, uuid, user);
    }

}
