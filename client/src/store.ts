import { Store, configureStore } from "@reduxjs/toolkit";
import { apiService } from "./service/apiService";
import authReducer from "./features/auth/authSlice";

export const store: Store = configureStore({
  reducer: {
    auth: authReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
