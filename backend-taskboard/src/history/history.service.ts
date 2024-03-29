import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

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

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }

  async createHistoryEntry(operation: string, payload: any) {
    const { name } = await this.prisma.list.findUnique({
      where: {
        id: payload.listId,
      },
    });

    const historyItem: CreateHistoryDto = {
      body: `You ${operation} ●${payload.name} to the ${name}`,
      date: new Date(),
      taskId: payload.id,
    };

    return this.prisma.history.create({
      data: historyItem,
    });
  }

  async deleteHistoryEntry(operation: string, payload: any) {
    const { name } = await this.prisma.list.findUnique({
      where: {
        id: payload.listId,
      },
    });

    const historyItem: CreateHistoryDto = {
      body: `You ${operation} ●${payload.name} from ${name}`,
      date: new Date(),
      taskId: null,
    };

    return this.prisma.history.create({
      data: historyItem,
    });
  }

  async updateHistoryEntry(operation: string, payload: any) {
    const { name } = await this.prisma.list.findUnique({
      where: {
        id: payload.listId,
      },
    });

    const historyItem: CreateHistoryDto = {
      body: `You ${operation} ●${payload.name} from ${name}`,
      date: new Date(),
      taskId: payload.id,
    };

    return this.prisma.history.create({
      data: historyItem,
    });
  }
}
