import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';
import { TaskHistoryService } from './taskHistory.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private historyService: TaskHistoryService,
  ) {}

  async findAll() {
    console.log('service');
    try {
      return await this.prisma.task.findMany({
        include: { priority: true },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch tasks.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { list: true, priority: true },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }
  async create(createTaskDto: CreateTaskDto) {
    try {
      const res = await this.prisma.task.create({
        data: createTaskDto,
      });

      await this.historyService.createHistory('create', res.id, res.name);

      return res;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const res = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    const changedFields: string[] = [];
    for (const key in updateTaskDto) {
      if (existingTask[key as keyof typeof existingTask] !== res[key as keyof typeof res]) {
        changedFields.push(key);
      }
    }

    for (const field of changedFields) {
      await this.historyService.createHistory(
        'update',
        id,
        existingTask.name,
        field,
        res[field as keyof typeof res]?.toString(),
        existingTask[field as keyof typeof existingTask]?.toString(),
      );
    }

    return res;
  }

  async remove(id: number) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.historyService.createHistory('delete', id, existingTask.name);

    await this.prisma.task.delete({ where: { id } });

    return `Task with id ${existingTask.id} deleted!`;
  }
}
