export interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl: string | null;
  dueDate: Date | null;
  priority: "low" | "medium" | "high";
  tags?: string[];
  checklist?: ChecklistItem[];
  attachments?: Attachment[];
  status: "pending" | "in progress" | "completed";
  size: "small" | "medium" | "large";
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
