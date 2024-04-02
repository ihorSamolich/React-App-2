import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class TaskHistoryService {
  constructor(private prisma: PrismaService) {}

  async createHistory(action: string, taskId: number, taskName: string, field?: string, newValue?: string, oldValue?: string) {
    console.log(field);
    console.log(newValue);
    if (field === 'priorityId') {
      field = 'priority';

      const newPriority = await this.prisma.priority.findUnique({
        where: {
          id: parseInt(newValue, 10),
        },
      });

      newValue = newPriority.name;

      const oldPriority = await this.prisma.priority.findUnique({
        where: {
          id: parseInt(oldValue, 10),
        },
      });

      oldValue = oldPriority.name;
    }

    if (field === 'listId') {
      field = 'list';
      action = 'move';

      const newList = await this.prisma.list.findUnique({
        where: {
          id: parseInt(newValue, 10),
        },
      });

      newValue = newList.name;

      const oldList = await this.prisma.list.findUnique({
        where: {
          id: parseInt(oldValue, 10),
        },
      });

      oldValue = oldList.name;
    }

    await this.prisma.history.create({
      data: {
        action,
        taskId,
        taskName,
        field,
        newValue,
        oldValue,
        date: new Date(),
      },
    });
  }
}
