import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = []


  getAllTask(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDTo: GetTasksFilterDto): Task[] {
    const { search, status } = filterDTo
    let tasks = this.getAllTask()

    if (status)
      tasks = tasks.filter(task => task.status === status)

    if (search)
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))

    return tasks
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id)
      if(!task)
        throw new NotFoundException(`Task with ID "${id}" not found`)
    return task
  }

  deleteTask(id: string): Task[] {
    this.getTaskById(id)
    return this.tasks = this.tasks.filter(task => task.id!== id)
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id)
    task.status = status
    return task
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task
  }
}
