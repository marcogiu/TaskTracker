import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Types } from 'mongoose';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto): Task {
    const newTask = { id: new Types.ObjectId(), ...createTaskDto };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }
}
