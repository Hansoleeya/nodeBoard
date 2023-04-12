import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Authservice } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { TypeOrmExModule } from "src/board/typeorm/typeorm-ex.module";
import { UserRepository } from "./user.repository";

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        TypeOrmExModule.forCustomRepository([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [Authservice]
})
export class AuthModule {}