import { configureStore, Store } from '@reduxjs/toolkit';
import apiService from './service/apiService';
import authReducer from './features/auth/authSlice';
import settingReducer from './features/setting/settingSlice';
import userReducer from './features/user/userSlice';

export const store: Store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    settings: settingReducer,
    [apiService.reducerPath]: apiService.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
