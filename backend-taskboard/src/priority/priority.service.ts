import { Injectable } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PriorityService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.priority.findMany();
  }

  create(createPriorityDto: CreatePriorityDto) {
    return 'This action adds a new priority';
  }

  findOne(id: number) {
    return `This action returns a #${id} priority`;
  }

  update(id: number, updatePriorityDto: UpdatePriorityDto) {
    return `This action updates a #${id} priority`;
  }

  remove(id: number) {
    return `This action removes a #${id} priority`;
  }
}
