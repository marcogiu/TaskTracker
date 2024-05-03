import mongoose, { Schema, Document } from 'mongoose';

// Enumerazioni definite come stringhe
const TaskSize = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
};

const TaskPriority = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

const TaskStatus = {
  Pending: 'pending',
  InProgress: 'in progress',
  Completed: 'completed',
};

// Interfacce per TypeScript
interface IChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface IAttachment {
  id: string;
  url: string;
  filename: string;
}

interface ITask extends Document {
  title: string;
  description: string;
  userId: string;
  imageUrl?: string;
  dueDate?: Date;
  priority: keyof typeof TaskPriority;
  tags?: string[];
  checklist?: IChecklistItem[];
  attachments?: IAttachment[];
  status: keyof typeof TaskStatus;
  size: keyof typeof TaskSize;
  createdAt: Date;
  updatedAt?: Date;
}

// Schema definitions
const ChecklistItemSchema = new Schema<IChecklistItem>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

const AttachmentSchema = new Schema<IAttachment>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  filename: { type: String, required: true },
});

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  imageUrl: { type: String, default: null },
  dueDate: { type: Date, default: null },
  priority: { type: String, enum: Object.values(TaskPriority), required: true },
  tags: [{ type: String }],
  checklist: [ChecklistItemSchema],
  attachments: [AttachmentSchema],
  status: { type: String, enum: Object.values(TaskStatus), required: true },
  size: { type: String, enum: Object.values(TaskSize), required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export default mongoose.model<ITask>('Task', TaskSchema);
