import { Body, Controller, Logger, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { Authservice } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: Authservice){ }
    private logger = new Logger('User');

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authDto:AuthDto):Promise<void>{
        this.logger.verbose('회원가입 신청');
        return this.authService.signUp(authDto);
    };

    @Post('/signIn')
    signIn(@Body(ValidationPipe) authDto:AuthDto): Promise<{accessToken:string}>{
        return this.authService.signIn(authDto);
    };

}
