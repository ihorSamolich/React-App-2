import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma.service';
import { HistoryService } from '../history/history.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, HistoryService],
})
export class TaskModule {}
