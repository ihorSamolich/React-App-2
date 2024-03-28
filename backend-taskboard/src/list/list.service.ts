import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListDto) {
    try {
      return await this.prisma.list.create({
        data: createListDto,
      });
    } catch (error) {
      throw this.handlePrismaError(
        error,
        'List name must be unique. Please check the entered list name and try again.',
      );
    }
  }

  async findAll() {
    try {
      return this.prisma.list.findMany({
        include: {
          tasks: {
            include: {
              priority: true,
              list: true,
            },
          },
        },
      });
    } catch (error) {
      throw this.handlePrismaError(error, 'Error fetch lists.');
    }
  }

  async findOne(id: number) {
    const list = await this.findListById(id);
    if (!list) {
      throw new NotFoundException();
    }
    return list;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const existingList = await this.findListById(id);
    if (!existingList) {
      throw new NotFoundException();
    }
    return this.prisma.list.update({
      where: {
        id: id,
      },
      data: {
        name: updateListDto.name,
      },
    });
  }

  async remove(id: number) {
    const existingList = await this.findListById(id);
    if (!existingList) {
      throw new NotFoundException();
    }

    const deleteTasks = this.prisma.task.deleteMany({
      where: {
        listId: id,
      },
    });

    const deleteList = this.prisma.list.delete({
      where: {
        id: id,
      },
    });

    await this.prisma.$transaction([deleteTasks, deleteList]);

    return `List with id ${id} has been successfully deleted`;
  }

  private async findListById(id: number) {
    try {
      return await this.prisma.list.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw this.handlePrismaError(error, 'Error fetching list.');
    }
  }

  private handlePrismaError(error: any, message: string) {
    console.error('Prisma error:', error);
    return new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
