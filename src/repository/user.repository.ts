import { CustomRepository } from "src/board/typeorm/typeorm-ex.decorator";
import { User } from "../auth/user.entity";
import { Repository } from "typeorm";
import { AuthDto } from "../auth/dto/auth.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authDto : AuthDto ): Promise<void>{
        const {userId, username, password} = authDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ userId, username, password: hashedPassword});
        
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException("중복된 아이디가 있습니다.");
            }else{
                throw new InternalServerErrorException();
            }
        }

    }
}