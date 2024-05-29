import * as Model from '../models';

export const EmptyTask: Model.Task = {
  id: '',
  title: '',
  description: '',
  userId: '',
  imageUrl: null,
  dueDate: null,
  priority: Model.TaskPriority.Low,
  tags: [],
  checklist: [],
  attachments: [],
  status: Model.TaskStatus.Pending,
  size: Model.TaskSize.Small,
  createdAt: new Date(),
  updatedAt: null
};

export const initialUserState: Model.User = {
  username: '',
  email: '',
  password: ''
};
