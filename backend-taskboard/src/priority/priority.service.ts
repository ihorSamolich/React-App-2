import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { handlePrismaError } from '../helpers/handlePrismaError';

@Injectable()
export class PriorityService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.priority.findMany({
        orderBy: { value: 'asc' },
      });
    } catch (error) {
      throw handlePrismaError(error, 'Error fetch priorities.');
    }
  }
}
