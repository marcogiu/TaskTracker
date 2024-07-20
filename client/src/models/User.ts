import { Task } from './Task';

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
