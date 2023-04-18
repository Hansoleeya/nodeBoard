import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from '../repository/board.repository';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';
import { Board } from './board.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ReplyRopository } from 'src/repository/reply.repository';
import { Reply } from 'src/reply/rely.entity';
import { ReplyService } from 'src/reply/reply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmExModule.forCustomRepository([BoardRepository,ReplyRopository]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService,ReplyService]
})
export class BoardsModule {}