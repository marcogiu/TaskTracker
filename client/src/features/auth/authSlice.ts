import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  token: string;
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
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
