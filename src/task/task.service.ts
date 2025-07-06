import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, title: 'any', isCompleted: false },
    { id: 2, title: 'some', isCompleted: true },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => Number(task.id) === id);
    if (!task) throw new NotFoundException('no task with the id');
    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, description, priority, tags } = dto;
    const newTask = {
      id: this.tasks.length + 1,
      title,
      description,
      priority,
      tags,
      isCompleted: false,
    };
    this.tasks.push(newTask);
    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;
    const task = this.findById(id);
    task.title = title;
    task.isCompleted = isCompleted;
    return task;
  }
  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);
    Object.assign(task, dto);
    return task;
  }
  delete(id: number) {
    const task = this.findById(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return task;
  }
}
