import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/authCredential.dto";

@Injectable()
export class Authservice {
    constructor(
        private userRepository: UserRepository,
    ){}

    async signUp(authCredentialsDto : AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}