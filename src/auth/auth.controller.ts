import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { Authservice } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredential.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: Authservice){ }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    };

    @Post('/signIn')
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto): Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialsDto);
    };

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log("user : ", user);
    }

}
