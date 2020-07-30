import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTask();
  }

  @Post()
  createTask(
    @Body() body: Task
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(body);
  }
}
