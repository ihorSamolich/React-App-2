import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from '../prisma.service';
import { handlePrismaError } from '../helpers/handlePrismaError';
import { validate } from 'class-validator';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardDto) {
    if (!createBoardDto.name) {
      throw handlePrismaError('Name length must be not empty!', 'Failed to create board.');
    }

    try {
      return await this.prisma.board.create({
        data: createBoardDto,
      });
    } catch (error) {
      throw handlePrismaError(error, 'Failed to create board.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.board.findMany({ orderBy: { id: 'asc' } });
    } catch (error) {
      throw handlePrismaError(error, 'Failed to fetch boards.');
    }
  }

  async findOne(id: number) {
    try {
      const board = await this.prisma.board.findUnique({ where: { id } });
      if (!board) {
        return new NotFoundException(`Board with id ${id} not found`);
      }
      return board;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw handlePrismaError(error, `Failed to fetch board with id ${id}.`);
    }
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const errors = await validate(UpdateBoardDto);
    if (errors.length > 0) {
      throw handlePrismaError('Validation error', `Validation failed: ${errors.join(', ')}`);
    }

    try {
      return await this.prisma.board.update({
        where: { id },
        data: updateBoardDto,
      });
    } catch (error) {
      throw handlePrismaError(error, `Failed to update board with id ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.task.deleteMany({
        where: {
          list: {
            boardId: id,
          },
        },
      });

      await this.prisma.list.deleteMany({
        where: {
          boardId: id,
        },
      });

      return await this.prisma.board.delete({ where: { id } });
    } catch (error) {
      throw handlePrismaError(error, `Failed to delete board with id ${id}.`);
    }
  }
}
