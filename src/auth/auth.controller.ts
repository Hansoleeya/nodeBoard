import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { Authservice } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredential.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: Authservice){ }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    };


}
