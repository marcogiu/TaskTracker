// userReducer.ts
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { registerUserRequest, registerUserSuccess, registerUserFailure } from "../actions/userActions";
import { User } from "../../models";

interface UserState {
  user: null | User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUserRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUserSuccess, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    })

    .addCase(registerUserFailure, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default userReducer;
