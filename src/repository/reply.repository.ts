import { User } from "src/auth/user.entity";
import { CustomRepository } from "src/board/typeorm/typeorm-ex.decorator";
import { CreateReplyDto } from "src/reply/dto/createReply.dto";
import { Reply } from "src/reply/rely.entity";
import {v1 as uuid} from 'uuid';
import { Repository } from "typeorm";

@CustomRepository(Reply)
export class ReplyRopository extends Repository<Reply>{
    async createReply(createReplyDto: CreateReplyDto, id:number, user:User):Promise<Reply>{
        const{content} = createReplyDto;
        
         const reply = this.create({
            id:uuid(),
            content,
            writeDate:Date(),
            user:user,
            board:{
                id : id,
            }
            
         });
         await this.save(reply);
         return reply;
    }
}