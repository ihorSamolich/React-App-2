import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({ tags: ['History'] })
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ tags: ['History'] })
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }
}
