import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
import { PriorityModule } from './priority/priority.module';
import { HistoryModule } from './history/history.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [TaskModule, ListModule, PriorityModule, HistoryModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
