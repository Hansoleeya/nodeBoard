import { Injectable, NotFoundException } from '@nestjs/common';
import { ReplyRopository } from 'src/repository/reply.repository';
import { CreateReplyDto } from './dto/createReply.dto';
import { User } from 'src/auth/user.entity';
import { Reply } from './rely.entity';
import { BoardRepository } from 'src/repository/board.repository';

@Injectable()
export class ReplyService {
    constructor(private replyRepository:ReplyRopository, private boardRepository: BoardRepository){}

    async createReply(createReplyDto: CreateReplyDto, id:number, user:User):Promise<Reply>{
        const found = await this.boardRepository.findOneBy({id});
        if(!found){
            throw new NotFoundException(`게시글 번호${id}를 찾을 수 없어 댓글 작성할 수 없습니다.`);
        }
        return this.replyRepository.createReply(createReplyDto, id, user);
    }
}
