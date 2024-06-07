import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../auth/authSlice';

interface UserState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout(state) {
      state.userInfo = null;
    }
  }
});

export const { userLoginRequest, userLoginSuccess, userLoginFailure, userLogout } = userSlice.actions;
export default userSlice.reducer;
