import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma.service';
import { TaskHistoryService } from './taskHistory.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, TaskHistoryService],
})
export class TaskModule {}
