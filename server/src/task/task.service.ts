import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(task: Partial<TaskDocument>): Promise<TaskDocument> {
    const createdTask = new this.taskModel(task);
    const savedTask = await createdTask.save();

    // Aggiungi il task all'utente
    await this.userModel.updateOne(
      { _id: task.owner },
      { $push: { tasks: savedTask._id } },
    );

    console.log(savedTask);

    return savedTask;
  }

  async findAllForUser(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ owner: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.owner.toString() !== userId) {
      throw new UnauthorizedException();
    }
    return task;
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.taskModel.deleteOne({ _id: task._id }).exec();
  }
}
