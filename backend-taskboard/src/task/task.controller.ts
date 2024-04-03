import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation } from '@nestjs/swagger';
//import { TaskInterceptor } from './task.interceptor';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ tags: ['Task'] })
  //@UseInterceptors(TaskInterceptor)
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ tags: ['Task'] })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ tags: ['Task'] })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ tags: ['Task'] })
  //@UseInterceptors(TaskInterceptor)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ tags: ['Task'] })
  //@UseInterceptors(TaskInterceptor)
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
