import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';
import { Board } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmExModule.forCustomRepository([BoardRepository]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}