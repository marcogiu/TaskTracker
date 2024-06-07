import apiService from './apiService';
import { Task } from '../models';

interface CreateTaskData {
  title: string;
  description: string;
}

interface UpdateTaskData {
  id: string;
  data: {
    title?: string;
    description?: string;
    completed?: boolean;
  };
}

interface CreateTaskResponse {
  task: Task;
}

interface UpdateTaskResponse {
  task: Task;
}

interface DeleteTaskResponse {
  success: boolean;
}

const TASKS_URL = '/api/tasks';

export const taskApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<CreateTaskResponse, CreateTaskData>({
      query: (data) => ({
        url: TASKS_URL,
        method: 'POST',
        body: data
      })
    }),

    getTasks: builder.query<Task[], void>({
      query: () => ({
        url: TASKS_URL,
        method: 'GET'
      })
    }),

    getTaskById: builder.query<Task, string>({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: 'GET'
      })
    }),

    updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskData>({
      query: ({ id, data }) => ({
        url: `${TASKS_URL}/${id}`,
        method: 'PATCH',
        body: data
      })
    }),

    deleteTask: builder.mutation<DeleteTaskResponse, string>({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useCreateTaskMutation: useCreateTask,
  useGetTasksQuery: useGetTasks,
  useGetTaskByIdQuery: useGetTaskById,
  useUpdateTaskMutation: useUpdateTask,
  useDeleteTaskMutation: useDeleteTask
} = taskApi;
