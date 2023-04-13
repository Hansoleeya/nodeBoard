import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Authservice } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { TypeOrmExModule } from "src/board/typeorm/typeorm-ex.module";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret : 'hansol',
            signOptions : {
                expiresIn: 3600
            }
        }),
        TypeOrmModule.forFeature([User]),
        TypeOrmExModule.forCustomRepository([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [Authservice, JwtStrategy],
    exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}