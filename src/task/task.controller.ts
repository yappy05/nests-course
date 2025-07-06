import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }
  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    const numId = Number(id);
    const task = this.taskService.findById(numId);
    if (!task) throw new NotFoundException('task not found!');
    return task;
  }
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(Number(id), dto);
  }
  @Patch(':id')
  patchUpdate(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDto>) {
    return this.taskService.patchUpdate(+id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(+id);
  }
}
