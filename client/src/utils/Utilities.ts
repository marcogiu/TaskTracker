import * as Model from "../models";

export const getTaskSize = (size: string): Model.TaskSize => {
  return Object.values(Model.TaskSize).includes(size as Model.TaskSize) ? (size as Model.TaskSize) : Model.TaskSize.Medium;
};

export const getTaskPriority = (priority: string): Model.TaskPriority => {
  return Object.values(Model.TaskPriority).includes(priority as Model.TaskPriority) ? (priority as Model.TaskPriority) : Model.TaskPriority.Medium;
};

export const getTaskStatus = (status: string): Model.TaskStatus => {
  return Object.values(Model.TaskStatus).includes(status as Model.TaskStatus) ? (status as Model.TaskStatus) : Model.TaskStatus.InProgress;
};
