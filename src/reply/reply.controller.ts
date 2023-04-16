import { Controller, Get } from '@nestjs/common';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
    constructor(private replyService:ReplyService){}

    @Get('/:id')
    getReply(){
        
    }

}
