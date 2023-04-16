import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Authservice } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { TypeOrmExModule } from "src/board/typeorm/typeorm-ex.module";
import { UserRepository } from "../repository/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret : `${jwtConfig.secret}`,
            signOptions : {
                expiresIn: jwtConfig.expirseIn,
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