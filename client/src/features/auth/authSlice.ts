import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  token: string;
  refreshToken: string;
  _id: string;
}

interface UserState {
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') as string) || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    refreshSuccess: (state, action: PayloadAction<{ token: string }>) => {
      if (state.userInfo) {
        state.userInfo.token = action.payload.token;
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      }
    }
  }
});

export const { loginSuccess, logout, refreshSuccess } = authSlice.actions;

export default authSlice.reducer;
