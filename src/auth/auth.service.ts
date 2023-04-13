import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/authCredential.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Authservice {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentialsDto : AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{accessToken : string}>{
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOneBy({username});

        if(user && (await bcrypt.compare(password, user.password))){
            // 유저 토큰 생성 ( secret + payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else{
            throw new UnauthorizedException('로그인 실패');
        }

    }
}