import { Controller, Get } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  @ApiOperation({ tags: ['Priority'] })
  findAll() {
    return this.priorityService.findAll();
  }
}
