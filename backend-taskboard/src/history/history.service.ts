import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  findAllForBoard(boardId: number) {
    return this.prisma.history.findMany({
      where: {
        task: {
          list: {
            boardId: Number(boardId),
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.history.findMany({
      where: {
        taskId: id,
      },
    });
  }
}
