import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request,
  ): Promise<TaskDocument> {
    const task = {
      ...createTaskDto,
      owner: req.user['_id'],
    };

    return this.taskService.create(task as Partial<TaskDocument>);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: Request): Promise<TaskDocument[]> {
    return this.taskService.findAllForUser(req.user['userId']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request): Promise<TaskDocument> {
    return this.taskService.findOne(id, req.user['userId']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request): Promise<void> {
    return this.taskService.remove(id, req.user['userId']);
  }
}
