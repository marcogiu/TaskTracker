import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark';
}

const initialState: SettingsState = {
  theme: 'light'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    }
  }
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
