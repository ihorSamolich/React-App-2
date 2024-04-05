import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('board/:boardId')
  @ApiOperation({ tags: ['History'] })
  findAllForBoard(@Param('boardId') boardId: number) {
    return this.historyService.findAllForBoard(boardId);
  }

  @Get(':id')
  @ApiOperation({ tags: ['History'] })
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }
}
