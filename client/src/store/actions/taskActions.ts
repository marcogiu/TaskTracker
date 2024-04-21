// actions/taskActions.ts

import { createAction } from "@reduxjs/toolkit";
import { Task } from "../types";

export const addTask = createAction<Task>("task/add");
export const removeTask = createAction<string>("task/remove");
