export interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl: string | null;
  dueDate: Date | null;
  priority: TaskPriority;
  tags?: string[];
  checklist?: ChecklistItem[];
  attachments?: Attachment[];
  status: TaskStatus;
  size: TaskSize;
  createdAt: Date;
  updatedAt: Date | null;
}

interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface Attachment {
  id: string;
  url: string;
  filename: string;
}

export enum TaskSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in progress",
  Completed = "completed",
}
