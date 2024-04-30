import * as Model from "../models";

export const EmptyTask: Model.Task = {
  id: "",
  title: "",
  description: "",
  userId: "",
  imageUrl: null,
  dueDate: null,
  priority: "low",
  tags: [],
  checklist: [],
  attachments: [],
  status: "pending",
  createdAt: new Date(),
  updatedAt: null,
  size: "small",
};
