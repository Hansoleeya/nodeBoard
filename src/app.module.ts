import { Module } from '@nestjs/common';
import { BoardsModule } from './board/board.module';
import { typeORMConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ReplyModule } from './reply/reply.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    ReplyModule
  ],

})
export class AppModule {}
