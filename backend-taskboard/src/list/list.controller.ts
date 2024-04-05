import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @ApiOperation({ tags: ['List'] })
  @UsePipes(new ValidationPipe())
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  @ApiOperation({ tags: ['List'] })
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  @ApiOperation({ tags: ['List'] })
  findOne(@Param('id') id: string) {
    return this.listService.findByBoard(+id);
  }

  @Patch(':id')
  @ApiOperation({ tags: ['List'] })
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  @ApiOperation({ tags: ['List'] })
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
