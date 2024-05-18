import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  Pending = 'In attesa',
  Ongoing = 'In corso',
  Completed = 'Completato',
}

export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TaskStatus })
  status: TaskStatus;

  @Prop({ required: true, enum: TaskPriority })
  priority: TaskPriority;

  @Prop()
  deadline: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
