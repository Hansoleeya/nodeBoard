import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { AuthModule } from 'src/auth/auth.module';
import { Reply } from './rely.entity';
import { ReplyRopository } from 'src/repository/reply.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/board/typeorm/typeorm-ex.module';
import { BoardRepository } from 'src/repository/board.repository';
import { BoardsService } from 'src/board/board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply]),
    TypeOrmExModule.forCustomRepository([ReplyRopository, BoardRepository]),
    AuthModule
  ],
  controllers: [ReplyController],
  providers: [ReplyService, BoardsService]
})
export class ReplyModule {}
