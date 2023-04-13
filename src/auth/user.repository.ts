import { CustomRepository } from "src/board/typeorm/typeorm-ex.decorator";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/authCredential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto : AuthCredentialsDto ): Promise<void>{
        const {username, password} = authCredentialsDto;
        const user = this.create({ username, password});
        
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