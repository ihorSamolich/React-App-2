import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.history.findMany();
  }

  findOne(id: number) {
    return this.prisma.history.findMany({
      where: {
        taskId: id,
      },
    });
  }
}
