import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Authservice {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authDto : AuthDto):Promise<void>{
        return this.userRepository.createUser(authDto);
    }

    async signIn(authDto: AuthDto):Promise<{accessToken : string}>{
        const {userId, password} = authDto;
        const user = await this.userRepository.findOneBy({userId});
        

        if(user && (await bcrypt.compare(password, user.password))){
            // 유저 토큰 생성 ( secret + payload)
            const payload = { userId };
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        } else{
            throw new UnauthorizedException('로그인 실패');
        }

    }
}