// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});

// Exporta il tipo dello stato root del tuo store
export type RootState = ReturnType<typeof store.getState>;
