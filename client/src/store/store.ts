import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, userReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});
