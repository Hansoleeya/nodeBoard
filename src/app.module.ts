import { Module } from '@nestjs/common';
import { BoardsModule } from './board/board.module';
import { typeORMConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule],

})
export class AppModule {}
