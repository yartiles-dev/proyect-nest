import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {
  }

  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    return Object.keys(filterDto).length ? this.tasksService.getTasksWithFilters(filterDto) : this.tasksService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskById(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    return this.tasksService.updateTask(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
